hi mendel,

saw your posting for principal ai-native architect across squiderp's .net, sql server, wpf, and angular platform. most teams hand agents loose reins, watch them bypass double-entry ledger boundaries or drop @tenantid filters to fix a query fast, and then spend weekends untangling architectural decay.

i built a live governance cockpit and drift firewall prototype specifically for squiderp so you can test how we prevent that before we write a line of production code:

live cockpit: https://squiderp-agentic-governance.vercel.app
github: https://github.com/exelentshakil/squiderp-agentic-governance

you can paste real c# or sql directly into the live auditor on the site. it runs real dual-provider ai (openai + gemini fallback) alongside a deterministic roslyn c# syntax engine that blocks direct mutations to generalledger outside of ledgertransactionscope.

here is how i run this across the 10 areas you called out:

1. requirements intake: we ban open-ended prompts like "add accounting sync." analysts write gherkin domain contracts (.feature files) with explicit scope-in and scope-out boundaries. an intake linter validates referenced entities against your data dictionary before coding agents touch a single file.

2. context injection: dumping your entire monolith into an llm context window guarantees hallucinated classes and high token burn. we slice repositories into domain-specific bounded context packs (accounting, inventory, sync) under 15k tokens with pre-indexed symbol graphs and .claude/rules/ defining forbidden namespaces.

3. architectural drift firewall: this cannot be an ai suggestion. we enforce it deterministically at compile time using custom c# roslyn analyzers (erp-arch-001) in teamcity. if an agent writes directly to generalledger or bypasses iledgercommandservice, the build throws a compilation error. it never reaches human pr review.

4. review workflows: a 3-tier adversarial pipeline. tier 1 is deterministic compilation and sql linter. tier 2 is a triad of specialized subagents running in parallel (concurrency hunter checking wpf dispatcher deadlocks, domain boundary auditor, and database ledger guardian). tier 3 is human sign-off.

5. deterministic vs ai split: deterministic handles compilation, syntax trees, tenant isolation predicates, schema migrations, and unit test pass rates. ai handles semantic edge-case synthesis, test data generation, and documentation.

6. human-in-the-loop: routine changes (dtos, unit tests, angular ui tweaks) auto-merge upon 100% test passage and 2/3 agent consensus. financial ledger mutations, sql schema alterations, and sync protocol changes strictly require staff architect sign-off.

7. legacy modernization (.net & sql server): strangler fig pattern with automated golden master characterization tests. we capture byte-for-byte input/output fixtures on legacy stored procedures and .net framework 4.8 services before letting agents refactor into .net 8 clean architecture.

8. multi-repo governance: central schema registry and versioned internal nuget packages for shared contracts. when a core contract changes, downstream repos run automated compatibility tests in parallel worktrees.

9. disobedient agents: hard compiler halts. if an agent removes a tenant filter or introduces a synchronous .wait() on a wpf ui thread, the roslyn gate rejects the commit, reverts the isolated git worktree, and feeds the compiler diagnostic back to the agent in an auto-remediation loop.

10. war stories: 12+ years building distributed systems, former lead engineer at legiit where i built the ai command center scaled to $1m arr across 1,500+ businesses and 1m+ marketplace orders. the biggest lesson is that prompt engineering without deterministic compiler gates always fails in enterprise erps. code quality in agentic workflows is an engineering problem, not a prompting trick.

on rate: i have calibrated at $47.00/hr, the top of your posted range, matching your past devops hire and well within your proven $75/hr spend on .net/angular. we can structure this as an initial 12-week architecture rollout (~25 to 30 hrs/wk) starting with a 2-week codebase diagnostic audit, then transition into ongoing architectural stewardship.

take 60 seconds to click through the live cockpit and run a test audit. if the operating model matches what you want for squiderp, let's jump on a quick 15-minute call this week to look at your current repo layout.

best,
shakil
founder, barakahsoft llc
upwork verified partner | former lead engineer, legiit ($1m arr)
https://squiderp-agentic-governance.vercel.app
