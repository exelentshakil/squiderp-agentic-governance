"use client";

import React from "react";
import { 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Code2, 
  Cpu, 
  RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArchitectureAuditResult } from "@/lib/ai";

export function LiveCodeAuditor() {
  const [codeSnippet, setCodeSnippet] = React.useState<string>(`// Paste or modify C# .NET or SQL code to test against SquidERP rules
public class OrderSyncHandler
{
    private readonly SquidDbContext _db;

    public OrderSyncHandler(SquidDbContext db)
    {
        _db = db;
    }

    public async Task ProcessOrderSync(Guid orderId, decimal total, Guid tenantId)
    {
        // Notice: Modifying Ledger balance directly without LedgerTransactionScope
        var ledger = new GeneralLedger
        {
            OrderId = orderId,
            TenantId = tenantId,
            BalanceChange = total,
            CreatedAt = DateTime.UtcNow
        };

        _db.GeneralLedger.Add(ledger);
        await _db.SaveChangesAsync();
    }
}`);

  const [techStack, setTechStack] = React.useState<".NET / C#" | "SQL Server" | "Angular / TypeScript" | "Desktop WPF / Service">(".NET / C#");
  const [profile, setProfile] = React.useState<"Accounting Isolation" | "SQL Performance & Concurrency" | "Architectural Boundary" | "General Modernization">("Accounting Isolation");
  
  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<ArchitectureAuditResult | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleAudit = async () => {
    if (!codeSnippet.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeSnippet,
          technologyStack: techStack,
          auditProfile: profile,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error("Audit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (type: "ledger" | "sql" | "wpf") => {
    if (type === "ledger") {
      setTechStack(".NET / C#");
      setProfile("Accounting Isolation");
      setCodeSnippet(`// Quick test: Direct GeneralLedger mutation
public async Task UpdateAccountBalance(Guid accountId, decimal debitAmount)
{
    var entry = new GeneralLedgerEntry { AccountId = accountId, Amount = debitAmount };
    _dbContext.GeneralLedger.Add(entry);
    await _dbContext.SaveChangesAsync();
}`);
    } else if (type === "sql") {
      setTechStack("SQL Server");
      setProfile("SQL Performance & Concurrency");
      setCodeSnippet(`-- Stored procedure missing tenant predicate
SELECT o.OrderId, o.TotalAmount, c.CompanyName
FROM Orders o
INNER JOIN Customers c ON c.CustomerId = o.CustomerId
WHERE o.Status = 'PENDING';`);
    } else {
      setTechStack("Desktop WPF / Service");
      setProfile("SQL Performance & Concurrency");
      setCodeSnippet(`// Synchronous wait on UI thread
public void OnSyncClick(object sender, RoutedEventArgs e)
{
    var result = _syncClient.DownloadCatalogUpdatesAsync().Result;
    MessageBox.Show($"Updated {result.Count} records");
}`);
    }
  };

  const copyPatch = () => {
    if (result?.suggestedPatch) {
      navigator.clipboard.writeText(result.suggestedPatch);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header & Quick Load Samples */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Dual-AI Code & Architecture Auditor
              </h3>
              <Badge variant="brand" className="text-xs font-mono">
                OpenAI + Gemini Dual Engine
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Paste real C# code or SQL queries to observe real-time drift detection, deterministic rule matching, and multi-agent peer review.
            </p>
          </div>

          {/* Quick-fill Sample Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 hidden md:inline">
              Try Sample:
            </span>
            <button
              onClick={() => loadSample("ledger")}
              className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap shrink-0"
            >
              C# Ledger Write
            </button>
            <button
              onClick={() => loadSample("sql")}
              className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap shrink-0"
            >
              SQL Stored Proc
            </button>
            <button
              onClick={() => loadSample("wpf")}
              className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap shrink-0"
            >
              WPF UI Thread
            </button>
          </div>
        </div>

        {/* Configuration Bar (Tech Stack & Profile) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 mb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Stack:
              </span>
              <select
                value={techStack}
                onChange={(e) => setTechStack(e.target.value as any)}
                className="text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value=".NET / C#">.NET / C# (Backend / API)</option>
                <option value="SQL Server">SQL Server (Stored Proc / Schema)</option>
                <option value="Angular / TypeScript">Angular / TypeScript (Web)</option>
                <option value="Desktop WPF / Service">Desktop WPF / Windows Service</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Audit Profile:
              </span>
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value as any)}
                className="text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Accounting Isolation">Accounting Isolation</option>
                <option value="SQL Performance & Concurrency">SQL Performance & Concurrency</option>
                <option value="Architectural Boundary">Architectural Boundary</option>
                <option value="General Modernization">General Modernization</option>
              </select>
            </div>
          </div>

          <Button
            variant="brand"
            size="sm"
            onClick={handleAudit}
            disabled={loading}
            className="text-xs font-semibold whitespace-nowrap shrink-0 shadow-sm"
          >
            {loading ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Auditing PR...
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Run Multi-Agent Audit
              </>
            )}
          </Button>
        </div>

        {/* Textarea Code Input */}
        <div className="relative rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden">
          <textarea
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            rows={9}
            className="w-full p-3 font-mono text-xs bg-slate-950 text-slate-100 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
            placeholder="Type or paste code snippet here..."
          />
        </div>
      </div>

      {/* Live AI Audit Results Display */}
      {result && (
        <div className="space-y-3">
          {/* Top Verdict Strip */}
          <div
            className={`p-4 rounded-xl border shadow-sm ${
              result.verdict === "APPROVED"
                ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20"
                : result.verdict === "REJECTED"
                ? "border-red-300 bg-red-50/60 dark:border-red-900 dark:bg-red-950/20"
                : "border-amber-300 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider whitespace-nowrap shrink-0 ${
                    result.verdict === "APPROVED"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900 dark:text-emerald-200"
                      : result.verdict === "REJECTED"
                      ? "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900 dark:text-red-200"
                      : "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-200"
                  }`}
                >
                  {result.verdict === "APPROVED" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <ShieldAlert className="h-3 w-3" />
                  )}
                  Verdict: {result.verdict}
                </span>

                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  Consensus: {result.consensusScore}%
                </span>
              </div>

              {/* Provider & Latency Telemetry Badge */}
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  {result.provider.toUpperCase()} • {result.model} • {result.latencyMs}ms
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              {result.summary}
            </p>

            {/* Human Sign-Off Warning if required */}
            {result.deterministicVsAiSplit?.humanSignOffRequired && (
              <div className="mt-3 p-2.5 rounded-lg bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Human Architect Gate Triggered:</strong>{" "}
                  {result.deterministicVsAiSplit.humanCheckReason}
                </div>
              </div>
            )}
          </div>

          {/* 2-Column Details: Violations & Subagent Triad */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Deterministic Rule Violations */}
            <div className="lg:col-span-6 p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Deterministic Roslyn / SQL Gate Matches
                </span>
                <Badge variant="outline" className="text-xs font-mono">
                  {result.deterministicViolations?.length || 0} Flags
                </Badge>
              </div>

              {result.deterministicViolations && result.deterministicViolations.length > 0 ? (
                <div className="space-y-2">
                  {result.deterministicViolations.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-red-600 dark:text-red-400">
                          {v.ruleId}
                        </span>
                        <span className="text-xs font-semibold px-1.5 py-0.2 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                          {v.severity}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-snug">
                        {v.description}
                      </p>
                      {v.lineRef && (
                        <span className="text-xs font-mono text-slate-500 mt-1 block">
                          Target: {v.lineRef} • {v.component}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>No deterministic violations detected. Zero architectural drift.</span>
                </div>
              )}
            </div>

            {/* Multi-Agent Review Triad */}
            <div className="lg:col-span-6 p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Specialized Subagent Peer Reviews
                </span>
                <Badge variant="brand" className="text-xs font-mono">
                  3 Agents
                </Badge>
              </div>

              <div className="space-y-2">
                {result.agentReviews?.map((ar, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {ar.agentName}
                      </span>
                      <span
                        className={`text-xs font-bold uppercase ${
                          ar.vote === "PASS"
                            ? "text-emerald-600"
                            : ar.vote === "FAIL"
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      >
                        {ar.vote}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {ar.critique}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Canonical Suggested Refactor Patch */}
          {result.suggestedPatch && (
            <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Code2 className="h-4 w-4 text-indigo-500" />
                  Canonical Architecture Patch (Refactored for SquidERP Standards)
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyPatch}
                  className="h-7 text-xs font-semibold whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
              <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto">
                <pre>
                  <code>{result.suggestedPatch}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
