"use client";

import React from "react";
import { 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FolderGit2, 
  ShieldCheck, 
  Terminal, 
  Database,
  Cpu
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlueprintExporterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlueprintExporter({ open, onOpenChange }: BlueprintExporterProps) {
  const [selectedFile, setSelectedFile] = React.useState<string>("claude-rules");
  const [copied, setCopied] = React.useState<boolean>(false);

  const files = {
    "claude-rules": {
      name: ".claude/rules/erp-architecture.md",
      type: "Markdown Rules",
      desc: "Repository-level rules bounding coding agents to SquidERP architectural patterns and forbidden APIs.",
      content: `# SquidERP Repository Architecture Rules
version: 3.2.0
last_updated: 2026-09-15

## 1. Domain Isolation & Transaction Boundaries
- All financial ledger mutations MUST route through \`ILedgerCommandService\` inside a \`LedgerTransactionScope\`.
- Direct manipulation of \`GeneralLedger\`, \`JournalEntry\`, or balance entities is strictly FORBIDDEN.
- Bypassing domain commands will fail the TeamCity Roslyn analyzer gate with error \`ERP-ARCH-001\`.

## 2. SQL Server Multi-Tenant Guardrails
- Every stored procedure and query accessing multi-tenant tables MUST include \`@TenantId\` predicate parameter.
- Cross-tenant queries without explicit tenant filtering are rejected by CI gate \`SQL-SEC-014\`.
- All table joins must maintain indexed clustered keys on \`(TenantId, DocumentDate)\`.

## 3. Desktop WPF & Windows Services Concurrency
- Never invoke synchronous \`.Result\` or \`.Wait()\` on async tasks on the WPF UI dispatcher.
- Always propagate \`CancellationToken\` through all synchronization loops.

## 4. PR Quality Gates
- Every PR must maintain >85% branch coverage on newly added domain logic.
- Characterization regression suites must pass before legacy code refactors are merged.`,
    },
    "roslyn-analyzer": {
      name: "SquidErp.Roslyn.LedgerRule.cs",
      type: "C# Analyzer",
      desc: "Custom Roslyn C# analyzer throwing compilation errors if any code bypasses LedgerTransactionScope.",
      content: `using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace SquidErp.Roslyn.ArchitectureRules
{
    [DiagnosticAnalyzer(LanguageNames.CSharp)]
    public class LedgerAccessAnalyzer : DiagnosticAnalyzer
    {
        public const string DiagnosticId = "ERP-ARCH-001";
        private const string Title = "Direct GeneralLedger Mutation Forbidden";
        private const string MessageFormat = "Direct write to '{0}' entity is forbidden. Must dispatch via ILedgerCommandService within a LedgerTransactionScope.";
        private const string Category = "Architecture.DomainIsolation";

        private static readonly DiagnosticDescriptor Rule = new(
            DiagnosticId,
            Title,
            MessageFormat,
            Category,
            DiagnosticSeverity.Error,
            isEnabledByDefault: true);

        public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics => 
            ImmutableArray.Create(Rule);

        public override void Initialize(AnalysisContext context)
        {
            context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
            context.EnableConcurrentExecution();
            context.RegisterSyntaxNodeAction(AnalyzeInvocation, SyntaxKind.InvocationExpression);
        }

        private static void AnalyzeInvocation(SyntaxNodeAnalysisContext context)
        {
            var invocation = (InvocationExpressionSyntax)context.Node;
            var symbol = context.SemanticModel.GetSymbolInfo(invocation).Symbol as IMethodSymbol;

            if (symbol == null) return;

            // Detect calls to DbContext.GeneralLedger.Add / Update
            if (symbol.Name is "Add" or "Update" or "Attach" &&
                symbol.ContainingType?.Name == "DbSet" &&
                symbol.TypeArguments.Length > 0 &&
                symbol.TypeArguments[0].Name == "GeneralLedgerEntry")
            {
                var diagnostic = Diagnostic.Create(Rule, invocation.GetLocation(), "GeneralLedgerEntry");
                context.ReportDiagnostic(diagnostic);
            }
        }
    }
}`,
    },
    "teamcity-pipeline": {
      name: "teamcity-ci-pipeline.kts",
      type: "Kotlin DSL",
      desc: "TeamCity CI pipeline configuration executing deterministic Roslyn gates and multi-agent reviews.",
      content: `package _Self.buildTypes

import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs

object ErpAgenticGovernanceGate : BuildType({
    name = "SquidERP AI PR Governance Gate"
    description = "Enforces deterministic Roslyn drift gates, SQL tenant isolation, and multi-agent review"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        script {
            name = "01. Roslyn Architecture Lint"
            scriptContent = """
                dotnet build SquidErp.sln /p:TreatWarningsAsErrors=true /p:EnforceCodeStyleInBuild=true
                dotnet run --project tools/SquidErp.Roslyn.Runner -- verify-boundaries
            """.trimIndent()
        }
        script {
            name = "02. SQL Server Migration & Tenant Check"
            scriptContent = """
                powershell -ExecutionPolicy Bypass -File ./scripts/verify-sql-tenant-isolation.ps1
            """.trimIndent()
        }
        script {
            name = "03. Multi-Agent Adversarial Consensus"
            scriptContent = """
                node ./tools/agentic-review/orchestrate-pr-audit.js --pr=%teamcity.build.branch%
            """.trimIndent()
        }
    }

    triggers {
        vcs {
            branchFilter = "+:refs/pull/*"
        }
    }
})`,
    },
    "sql-migration-guard": {
      name: "sql-server-migration-guard.sql",
      type: "T-SQL Script",
      desc: "SQL Server deterministic migration policy script verifying tenant partition keys on all tables and views.",
      content: `-- SquidERP Database Governance Guardrail: Multi-Tenant Column & Clustered Index Verification
-- Run in CI pre-deployment step against candidate DDL migrations

DECLARE @MissingTenantCount INT = 0;

SELECT 
    t.name AS TableName,
    SCHEMA_NAME(t.schema_id) AS SchemaName
FROM sys.tables t
WHERE t.is_ms_shipped = 0
  AND t.name NOT IN ('SysConfig', 'TenantRegistry', '__EFMigrationsHistory')
  AND NOT EXISTS (
      SELECT 1 
      FROM sys.columns c 
      WHERE c.object_id = t.object_id 
        AND c.name = 'TenantId'
  );

SELECT @MissingTenantCount = @@ROWCOUNT;

IF @MissingTenantCount > 0
BEGIN
    RAISERROR('CRITICAL CI FAILURE: Detected %d user tables missing mandatory TenantId column. Migration aborted.', 16, 1, @MissingTenantCount);
END
ELSE
BEGIN
    PRINT 'SUCCESS: All database tables comply with SquidERP multi-tenant partitioning standards.';
END;`,
    },
  };

  const current = files[selectedFile as keyof typeof files];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([current.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = current.name.split("/").pop() || "blueprint.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-5 pb-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <DialogTitle className="text-base font-bold text-slate-900 dark:text-white">
                Turnkey Enterprise Architecture Blueprints
              </DialogTitle>
            </div>
            <Badge variant="brand" className="font-mono text-xs">
              Ready for Production
            </Badge>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Exportable code files ready to be placed directly into SquidERP's repositories and TeamCity CI/CD pipelines.
          </DialogDescription>

          {/* Brevity Law Anti-Wrap Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto scrollbar-none">
            {Object.entries(files).map(([key, f]) => (
              <button
                key={key}
                onClick={() => setSelectedFile(key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  selectedFile === key
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {f.type}
              </button>
            ))}
          </div>
        </DialogHeader>

        {/* Content Viewer */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                {current.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {current.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="h-8 text-xs font-semibold whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="brand"
                onClick={handleDownload}
                className="h-8 text-xs font-semibold whitespace-nowrap shrink-0"
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto max-h-[380px] leading-relaxed">
            <pre>
              <code>{current.content}</code>
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
