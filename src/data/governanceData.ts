export interface ErpScenario {
  id: string;
  title: string;
  technology: ".NET / C#" | "SQL Server" | "Angular / TypeScript" | "Desktop WPF / Service";
  profile: "Accounting Isolation" | "SQL Performance & Concurrency" | "Architectural Boundary" | "General Modernization";
  status: "FAIL_DRIFT" | "FAIL_SECURITY" | "FAIL_CONCURRENCY" | "PASS_COMPLIANT";
  description: string;
  codeSnippet: string;
  expectedViolations: {
    ruleId: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM";
    message: string;
  }[];
  explanation: string;
}

export const ERP_SCENARIOS: ErpScenario[] = [
  {
    id: "scenario-ledger-drift",
    title: "Rogue Direct Ledger Write (C# / .NET)",
    technology: ".NET / C#",
    profile: "Accounting Isolation",
    status: "FAIL_DRIFT",
    description: "An AI coding agent attempted to satisfy a quick feature request by writing directly to the GeneralLedger database entity, bypassing the mandatory double-entry audit trail and LedgerTransactionScope.",
    codeSnippet: `// Agent PR #1428: Quick fix for Invoice balance sync
public class InvoicePostService : IInvoicePostService
{
    private readonly SquidErpDbContext _context;

    public InvoicePostService(SquidErpDbContext context)
    {
        _context = context;
    }

    public async Task PostInvoiceBalance(Guid invoiceId, decimal amount, Guid tenantId)
    {
        // ❌ ARCHITECTURAL DRIFT: Directly creating ledger entries!
        // Bypasses LedgerTransactionScope and ILedgerCommandService
        var entry = new GeneralLedgerEntry
        {
            Id = Guid.NewGuid(),
            TenantId = tenantId,
            AccountId = new Guid("1010-CASH"),
            Amount = amount,
            PostedAt = DateTime.UtcNow,
            Reference = $"INV-{invoiceId}"
        };

        _context.GeneralLedger.Add(entry);
        await _context.SaveChangesAsync();
    }
}`,
    expectedViolations: [
      {
        ruleId: "ERP-ARCH-001",
        severity: "CRITICAL",
        message: "Direct mutation of GeneralLedger entity detected. Must invoke ILedgerCommandService within a verified LedgerTransactionScope.",
      },
    ],
    explanation: "In an enterprise accounting ERP, raw entity writes to ledger tables destroy transaction auditability and break GAAP compliance. Our Roslyn analyzer intercepts this at compilation before human review is ever requested.",
  },
  {
    id: "scenario-sql-tenant-leak",
    title: "SQL Stored Proc Missing TenantId Filter",
    technology: "SQL Server",
    profile: "SQL Performance & Concurrency",
    status: "FAIL_SECURITY",
    description: "Coding agent generated an optimized reporting stored procedure but omitted the @TenantId predicate on a join table, introducing cross-tenant data leakage.",
    codeSnippet: `CREATE PROCEDURE dbo.sp_GetAgingReceivablesReport
    @TenantId UNIQUEIDENTIFIER,
    @CutoffDate DATETIME2
AS
BEGIN
    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    -- ❌ SECURITY DRIFT: Customers table missing TenantId filter!
    -- Cross-tenant customer names will bleed into the report
    SELECT 
        c.CustomerNumber,
        c.CompanyName,
        SUM(i.TotalDue) AS TotalOutstanding,
        MAX(DATEDIFF(day, i.DueDate, @CutoffDate)) AS MaxDaysOverdue
    FROM dbo.Invoices i WITH (NOLOCK)
    INNER JOIN dbo.Customers c ON c.CustomerId = i.CustomerId
    WHERE i.TenantId = @TenantId
      AND i.Status = 'OPEN'
      AND i.InvoiceDate <= @CutoffDate
    GROUP BY c.CustomerNumber, c.CompanyName;
END;`,
    expectedViolations: [
      {
        ruleId: "SQL-SEC-014",
        severity: "CRITICAL",
        message: "Inner join target dbo.Customers is not partitioned by @TenantId. Potential cross-tenant data disclosure.",
      },
    ],
    explanation: "Multi-tenant SQL Server architectures must enforce strict tenant partitioning across all table joins. The deterministic SQL policy gate rejects any migration or procedure missing tenant filters.",
  },
  {
    id: "scenario-wpf-deadlock",
    title: "Desktop Sync Service UI Thread Deadlock",
    technology: "Desktop WPF / Service",
    profile: "SQL Performance & Concurrency",
    status: "FAIL_CONCURRENCY",
    description: "Coding agent refactored synchronization loop in the Windows desktop app using synchronous .Result, triggering UI freezes and thread-pool exhaustion.",
    codeSnippet: `// SquidERP.Desktop.SyncEngine / SyncCoordinator.cs
public class SyncCoordinator
{
    private readonly IErpSyncService _syncService;

    public void OnInventorySyncTriggered(object sender, EventArgs e)
    {
        // ❌ CONCURRENCY HAZARD: Calling .Result on UI dispatcher thread
        // Causes intermittent WPF UI freezing and synchronization deadlocks
        var payload = _syncService.FetchPendingSyncBatchAsync(Environment.MachineName).Result;

        UpdateStatusBarText($"Synchronized {payload.ItemCount} warehouse items.");
    }
}`,
    expectedViolations: [
      {
        ruleId: "WPF-PERF-009",
        severity: "HIGH",
        message: "Synchronous blocking call (.Result) detected inside WPF event handler. Must use async/await with ConfigureAwait(true).",
      },
    ],
    explanation: "Desktop ERP clients communicating with backend sync services require strict async dispatcher isolation. The concurrency review subagent flags sync-over-async anti-patterns immediately.",
  },
  {
    id: "scenario-compliant-refactor",
    title: "Compliant .NET 8 CQRS Command Handler",
    technology: ".NET / C#",
    profile: "Architectural Boundary",
    status: "PASS_COMPLIANT",
    description: "Production-ready, compliant pull request refactored with Clean Architecture, MediatR command handler, domain validation, and explicit transactional boundaries.",
    codeSnippet: `// SquidERP.Accounting.Application.Commands / PostInvoiceCommand.cs
public sealed record PostInvoiceCommand(
    Guid InvoiceId,
    decimal Amount,
    Guid TenantId,
    string UserId
) : IRequest<Result<InvoicePostResponse>>;

public sealed class PostInvoiceCommandHandler 
    : IRequestHandler<PostInvoiceCommand, Result<InvoicePostResponse>>
{
    private readonly ILedgerCommandService _ledgerService;
    private readonly ITenantIsolationValidator _tenantValidator;
    private readonly IResiliencePipeline _resilience;

    public PostInvoiceCommandHandler(
        ILedgerCommandService ledgerService,
        ITenantIsolationValidator tenantValidator,
        IResiliencePipeline resilience)
    {
        _ledgerService = ledgerService;
        _tenantValidator = tenantValidator;
        _resilience = resilience;
    }

    public async Task<Result<InvoicePostResponse>> Handle(
        PostInvoiceCommand request, 
        CancellationToken cancellationToken)
    {
        await _tenantValidator.EnforceTenantContextAsync(request.TenantId, cancellationToken);

        return await _resilience.ExecuteAsync(async ct =>
        {
            using var scope = await _ledgerService.BeginScopeAsync(request.TenantId, ct);
            
            var result = await _ledgerService.PostJournalEntryAsync(
                new JournalEntrySpecification(request.InvoiceId, request.Amount), ct);
                
            await scope.CommitAsync(ct);
            return Result.Success(new InvoicePostResponse(result.EntryId, result.PostedDate));
        }, cancellationToken);
    }
}`,
    expectedViolations: [],
    explanation: "Zero violations. Follows canonical dependency inversion, encapsulates tenant context, and manages transactional boundaries through the approved domain service.",
  },
];

export interface ArchitecturalTenet {
  id: number;
  question: string;
  shortTitle: string;
  category: "Intake & Context" | "Governance & Control" | "Legacy & Scale" | "Evolution";
  operationalModel: string;
  deterministicVsAi: string;
  concreteArtifacts: string[];
  squidErpApplication: string;
}

export const ARCHITECTURAL_TENETS: ArchitecturalTenet[] = [
  {
    id: 1,
    question: "How developers or business/technical analysts provided requirements.",
    shortTitle: "Structured Spec & Acceptance Boundaries",
    category: "Intake & Context",
    operationalModel: "We enforce a two-stage requirement pipeline: Business/technical analysts write in Gherkin-style domain specifications (.feature / markdown contracts) with explicit 'Scope In / Scope Out' boundaries. Before coding agents touch a single file, an Architectural Intake Linter checks that the spec references approved domain entities and contains clear testable acceptance criteria.",
    deterministicVsAi: "Deterministic: Regex & schema validation ensuring all database entities mentioned exist in the data dictionary. AI: Expanding test scenarios, generating edge-case specifications, and identifying missing business rules.",
    concreteArtifacts: ["docs/specs/*.feature", "spec-schema.json", "acceptance-matrix.md"],
    squidErpApplication: "Prevents developers or product managers from giving vague prompts like 'add accounting sync' to coding agents, which always leads to architectural drift.",
  },
  {
    id: 2,
    question: "How coding agents received architectural and domain context.",
    shortTitle: "Bounded Context Packs & Repository Rules",
    category: "Intake & Context",
    operationalModel: "We do NOT dump entire multi-million line codebases into the LLM context window. Instead, we use hierarchical repository rules (.claude/rules/, .cursorrules) combined with domain-specific 'Context Packs'. When an agent works on Accounting, it only loads the Accounting Domain Context Pack (contracts, DTOs, interfaces, and transaction guidelines), not desktop UI or mobile code.",
    deterministicVsAi: "Deterministic: AST symbol indexer (ctags / Roslyn symbol graph) pulling exact type signatures. AI: Semantic reasoning over the localized module contracts.",
    concreteArtifacts: [".claude/rules/*.md", ".github/context-packs/accounting.md", "domain-symbol-graph.json"],
    squidErpApplication: "Keeps prompt token consumption sub-15k tokens per turn while ensuring the agent understands SquidERP's exact accounting boundaries.",
  },
  {
    id: 3,
    question: "How you prevented agents from creating parallel or inconsistent architecture.",
    shortTitle: "The Architectural Drift Firewall (Roslyn + AST)",
    category: "Governance & Control",
    operationalModel: "This is the single most critical pillar. Agents tend to create duplicate helper classes, parallel repository layers, or bypass established patterns when they don't know an abstraction already exists. We enforce a 'Forbidden Reference' Roslyn analyzer in .NET that throws compilation errors if new code directly references raw persistence without going through approved service abstractions.",
    deterministicVsAi: "Deterministic (100%): Roslyn analyzers (C#), ESLint architecture plugins (Angular), and SQL schema linters that fail the build in CI. AI: Semantic similarity scanner that detects if an agent is reinventing an existing helper method.",
    concreteArtifacts: ["SquidErp.Roslyn.ArchitectureRules.dll", "forbidden-namespaces.config", ".eslintrc.architecture.json"],
    squidErpApplication: "Guarantees that no agent or junior developer can create a parallel data access layer in SquidERP's .NET backend.",
  },
  {
    id: 4,
    question: "How AI-generated changes were reviewed.",
    shortTitle: "3-Tier Adversarial Review Pipeline",
    category: "Governance & Control",
    operationalModel: "Every AI-generated PR goes through a strict 3-tier review: Tier 1: Deterministic Gates (Roslyn, formatting, unit tests, SQL migration checks). Tier 2: Multi-Agent Adversarial Review (3 independent subagents: Correctness/Concurrency, Domain Boundary, and SQL/Ledger integrity). Tier 3: Human Staff Engineer approval focused on business intent.",
    deterministicVsAi: "Deterministic: Build compilation, test coverage delta, Roslyn rule compliance. AI: Adversarial multi-agent consensus scoring (minimum 80% consensus required).",
    concreteArtifacts: ["agent-review-orchestrator.ts", "adversarial-prompts/*.md", "pr-verdict-schema.json"],
    squidErpApplication: "Filters out 90% of sloppy PRs before a human engineer ever opens GitHub or TeamCity.",
  },
  {
    id: 5,
    question: "What was enforced deterministically versus reviewed by AI.",
    shortTitle: "The Deterministic vs. AI Enforcement Split",
    category: "Governance & Control",
    operationalModel: "Rule of thumb: If it can be checked with an AST, compiler, linter, regex, or unit test, it MUST be deterministic. AI is NEVER trusted with syntax, security boundaries, or multi-tenant filters. AI is reserved strictly for semantic validation: 'Does this code fulfill the business requirement without subtle logic bugs?'",
    deterministicVsAi: "Deterministic: SQL injection, multi-tenant WHERE clauses, transaction scope wrappers, dependency direction, formatting. AI: Business rule edge cases, naming clarity, test coverage sufficiency.",
    concreteArtifacts: ["rules-matrix.csv", "roslyn-checks.xml", "sql-partition-validator.ps1"],
    squidErpApplication: "Eliminates non-deterministic flake and hallucination risks from SquidERP's core ERP pipelines.",
  },
  {
    id: 6,
    question: "Where humans remained in the approval process.",
    shortTitle: "Human-in-the-Loop Risk Gates",
    category: "Governance & Control",
    operationalModel: "Humans are strategically placed at high-blast-radius decision points, NOT micro-reading syntax. Mandatory Human Sign-Off triggers: 1. Any change modifying financial ledger or balance computation logic. 2. Any database migration changing table schemas or indexes. 3. Public API contract changes impacting desktop or mobile synchronization. 4. Release to staging and production.",
    deterministicVsAi: "Deterministic: Automation automatically tags PRs with risk labels ('Risk: High - Ledger Mutation'). Humans: One-click approval after reviewing pre-summarized diffs and agent verdicts.",
    concreteArtifacts: ["CODEOWNERS", "github-environment-rules.json", "audit-signoff-log.sql"],
    squidErpApplication: "Ensures Mendel and senior SquidERP architects maintain absolute sovereign control over the financial ledger and database schema.",
  },
  {
    id: 7,
    question: "How you handled large or legacy codebases.",
    shortTitle: "Strangler Fig Modernization & Golden Master Tests",
    category: "Legacy & Scale",
    operationalModel: "In legacy .NET Framework / SQL Server codebases with decades of stored procedures, rewriting from scratch is suicide. We use the Strangler Fig pattern: Coding agents write automated 'Characterization Tests' (Golden Master suites) that capture the exact legacy behavior before any refactor. The agent then ports logic to modern .NET 8, and the test suite verifies byte-for-byte behavioral equivalence.",
    deterministicVsAi: "Deterministic: Automated snapshot diffing comparing legacy SQL / .NET output against modern API output. AI: Generating test data fixtures and scaffolding clean architecture DTOs.",
    concreteArtifacts: ["golden-master-runner.cs", "characterization-suite.json", "legacy-adapter-shim.cs"],
    squidErpApplication: "Enables SquidERP to modernize legacy stored procedures and .NET services safely without breaking existing customer installations.",
  },
  {
    id: 8,
    question: "How the approach worked across multiple repositories, applications, or technology stacks.",
    shortTitle: "Federated MCP & Unified Cross-Stack Standards",
    category: "Legacy & Scale",
    operationalModel: "SquidERP spans .NET, SQL Server, Angular, WPF, and mobile. We maintain a centralized 'Architecture Governance Repository' containing shared schemas, API contracts, and domain dictionaries. We run a centralized Model Context Protocol (MCP) server that indexes API contracts across all repos, so an agent modifying an Angular screen immediately knows the exact DTO schema of the backend .NET API.",
    deterministicVsAi: "Deterministic: OpenAPI / Protobuf schema generators producing strongly-typed clients for Angular and WPF. AI: Cross-stack integration verification.",
    concreteArtifacts: ["squiderp-mcp-server/", "contracts/openapi.yaml", "shared-rules.git"],
    squidErpApplication: "Prevents breaking synchronization contracts between the backend ERP APIs, WPF desktop apps, and Angular web clients.",
  },
  {
    id: 9,
    question: "What happened when an agent ignored or misunderstood its instructions.",
    shortTitle: "Fail-Closed Quarantine & Automatic Rejection",
    category: "Evolution",
    operationalModel: "When an agent ignores instructions (e.g. bypasses a rule or hallucinates an unsupported library), the CI pipeline operates on a 'Fail-Closed' policy. The PR is immediately marked BLOCKED, a quarantine branch is isolated, and the agent receives automated diagnostic feedback with exact line numbers and compiler errors to self-correct in a bounded loop (max 3 retries before escalating to human).",
    deterministicVsAi: "Deterministic: Build break, automated comment posted on PR, branch protection prevents merge. AI: Self-healing repair loop analyzing compiler stderr.",
    concreteArtifacts: ["agent-quarantine-action.yml", "self-healing-retry-loop.sh", "drift-telemetry.log"],
    squidErpApplication: "Stops rogue agent PRs from polluting the main branch or consuming senior engineer debugging time.",
  },
  {
    id: 10,
    question: "What you would do differently if you designed the system again today.",
    shortTitle: "Lessons Learned: Compact Context & Determinism First",
    category: "Evolution",
    operationalModel: "1. Stop writing 50-page prompt instructions—agents ignore long prompts; keep repository rules under 150 lines and decompose into modular skills. 2. Invest in custom Roslyn analyzers on Day 1 rather than relying on LLMs to self-police code quality. 3. Use specialized single-responsibility subagents instead of one giant agent doing research, coding, and review.",
    deterministicVsAi: "Shifted 40% of what was previously reviewed by LLM prompts into ultra-fast, zero-cost deterministic static analyzers.",
    concreteArtifacts: ["lean-rules-template.md", "subagent-topology.svg", "roi-benchmark.json"],
    squidErpApplication: "Gives SquidERP an immediately practical, battle-tested playbook that avoids the common traps and money-pit mistakes of enterprise AI adoption.",
  },
];

export interface OperatingPhase {
  phase: string;
  name: string;
  duration: string;
  focus: string;
  deliverables: string[];
  clientCommitment: string;
}

export const DIAGNOSTIC_ROADMAP: OperatingPhase[] = [
  {
    phase: "Phase 0",
    name: "Live Architectural Control Plane & Drift Firewall Prototype",
    duration: "Shipped Live (Today)",
    focus: "Working prototype demonstrating multi-agent review, Roslyn rule gates, and drift detection.",
    deliverables: [
      "Live interactive governance cockpit deployed on Vercel",
      "Real dual-provider AI code & architecture auditor (/api/ai/audit)",
      "Interactive 4-scenario architectural drift simulation engine",
      "Exportable production blueprints (Roslyn, TeamCity, Claude rules)",
    ],
    clientCommitment: "$0.00 (Demonstrated proof of technical capability upfront)",
  },
  {
    phase: "Phase 1",
    name: "Engineering & AI-Development Diagnostic Audit",
    duration: "Weeks 1–2",
    focus: "In-depth diagnostic assessment of SquidERP's mature production codebase, .NET/SQL architecture, and current AI workflows.",
    deliverables: [
      "Comprehensive Diagnostic Report on SquidERP's current engineering lifecycle",
      "Inventory of architectural drift vulnerabilities and legacy bottleneck hotspots",
      "Evaluation of developer workflows across Claude Code, Codex, and Cursor",
      "Target Architecture Blueprint: Scalable AI-native operating model for SquidERP",
    ],
    clientCommitment: "Diagnostic Milestone (~25-30 hrs/wk)",
  },
  {
    phase: "Phase 2",
    name: "Repository Rules, Skills & Context Engine Setup",
    duration: "Weeks 3–5",
    focus: "Implementing repository-level AI instructions, modular skills, and bounded context packs across .NET, SQL, and Angular repos.",
    deliverables: [
      "Repository-level .claude/rules and context governance across key ERP repos",
      "Domain-specific Context Packs for Accounting, Inventory, Sync, and Reporting",
      "Custom MCP servers indexing SquidERP schema, APIs, and data dictionary",
      "Standardized requirements templates for analysts and developers",
    ],
    clientCommitment: "Diagnostic Milestone (~25-30 hrs/wk)",
  },
  {
    phase: "Phase 3",
    name: "TeamCity CI/CD Quality Gates & Roslyn Drift Firewall",
    duration: "Weeks 6–9",
    focus: "Building deterministic quality gates and automated multi-agent review pipelines in TeamCity.",
    deliverables: [
      "Custom C# Roslyn analyzers enforcing SquidERP domain and transaction boundaries",
      "SQL Server migration and multi-tenant isolation CI quality gates",
      "Automated multi-agent PR review workflow integrated with TeamCity",
      "Human-in-the-loop escalation dashboard for high-risk changes",
    ],
    clientCommitment: "Diagnostic Milestone (~25-30 hrs/wk)",
  },
  {
    phase: "Phase 4",
    name: "Legacy Modernization Playbook & Developer Enablement",
    duration: "Weeks 10–14+",
    focus: "Scaling the operating model across all development teams and modernizing legacy .NET / SQL Server components.",
    deliverables: [
      "Strangler Fig modernization workflows for legacy stored procedures and WPF sync",
      "Golden Master automated characterization test harnesses",
      "Developer enablement workshops and onboarding playbooks for SquidERP engineers",
      "Ongoing advisory and architectural stewardship",
    ],
    clientCommitment: "Ongoing Architectural Stewardship",
  },
];
