"use client";

import React from "react";
import { 
  ERP_SCENARIOS, 
  ErpScenario 
} from "@/data/governanceData";
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileCode, 
  Cpu, 
  Sparkles,
  ArrowRight,
  Terminal,
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DriftScenarioSimulator() {
  const [selectedScenario, setSelectedScenario] = React.useState<ErpScenario>(ERP_SCENARIOS[0]);
  const [evaluating, setEvaluating] = React.useState<boolean>(false);
  const [evaluated, setEvaluated] = React.useState<boolean>(true);

  const handleSelect = (sc: ErpScenario) => {
    setSelectedScenario(sc);
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setEvaluated(true);
    }, 300);
  };

  const isPassing = selectedScenario.status === "PASS_COMPLIANT";

  return (
    <div className="w-full space-y-4">
      {/* Top Banner & Scenario Selector */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Interactive Architectural Drift & Hallucination Simulator
              </h3>
              <Badge variant="outline" className="font-mono text-xs">
                4 Representative PRs
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select a representative ERP code modification to see how our deterministic Roslyn and SQL gates intercept architectural decay before merge.
            </p>
          </div>

          {/* Brevity Law Badges */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0">
              <Cpu className="h-3.5 w-3.5" />
              SquidERP .NET 8
            </span>
          </div>
        </div>

        {/* 4 Scenario Pill Buttons (Single-line Anti-wrap Mandate) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {ERP_SCENARIOS.map((sc) => {
            const isSelected = selectedScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelect(sc)}
                className={`p-3 text-left rounded-lg border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm ring-1 ring-indigo-600"
                    : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 dark:border-slate-800 dark:bg-slate-850"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 truncate">
                      {sc.technology}
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold whitespace-nowrap shrink-0 ${
                        sc.status === "PASS_COMPLIANT"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                      }`}
                    >
                      {sc.status === "PASS_COMPLIANT" ? "Compliant" : "Drift Risk"}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {sc.title}
                  </h4>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 truncate">
                  Profile: {sc.profile}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inspection Grid (Code Diff on Left, Gate Verdict on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Code Viewer (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col">
          {/* Code Viewer Header */}
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileCode className="h-4 w-4 text-indigo-500 shrink-0" />
              <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 truncate">
                {selectedScenario.title}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
              Stack: {selectedScenario.technology}
            </span>
          </div>

          {/* Description Callout */}
          <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-200/50 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {selectedScenario.description}
            </p>
          </div>

          {/* Monospace Code Editor View */}
          <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed flex-1">
            <pre>
              <code>{selectedScenario.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: Deterministic Gate Results & Agent Review (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Primary Gate Verdict Card */}
          <div
            className={`p-4 rounded-xl border shadow-sm ${
              isPassing
                ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                : "border-red-300 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Deterministic CI/CD Gate
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider whitespace-nowrap shrink-0 ${
                  isPassing
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900 dark:text-emerald-200"
                    : "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {isPassing ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    Passed (100%)
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-3 w-3" />
                    Blocked
                  </>
                )}
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {isPassing
                ? "PR Clean Architecture Verified"
                : "Architectural Drift Blocked at Compilation"}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedScenario.explanation}
            </p>

            {/* Violation Details if blocked */}
            {!isPassing && selectedScenario.expectedViolations.length > 0 && (
              <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-900/60 space-y-2">
                <span className="text-xs font-bold font-mono text-red-800 dark:text-red-400 uppercase tracking-wider">
                  Diagnostic Diagnostics:
                </span>
                {selectedScenario.expectedViolations.map((v) => (
                  <div
                    key={v.ruleId}
                    className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-red-200 dark:border-red-900 text-xs"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-red-700 dark:text-red-400 mb-1">
                      <span>{v.ruleId}</span>
                      <span className="text-xs uppercase px-1.5 py-0.2 rounded bg-red-100 dark:bg-red-950">
                        {v.severity}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-snug">
                      {v.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Multi-Agent Review Triad Breakdown */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Multi-Agent Review Triad
              </span>
              <Badge variant="brand" className="text-xs font-mono">
                Consensus {isPassing ? "98%" : "34%"}
              </Badge>
            </div>

            {/* Agent 1: Concurrency Hunter */}
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Agent 1: Concurrency Hunter
                </span>
                <span className={`text-xs font-bold uppercase ${selectedScenario.status === "FAIL_CONCURRENCY" ? "text-red-600" : "text-emerald-600"}`}>
                  {selectedScenario.status === "FAIL_CONCURRENCY" ? "Veto / Block" : "Approved"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedScenario.status === "FAIL_CONCURRENCY"
                  ? "Synchronous blocking call on WPF dispatcher will freeze client sync."
                  : "Async state machine and task scheduling adhere to non-blocking patterns."}
              </p>
            </div>

            {/* Agent 2: Boundary Auditor */}
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Agent 2: Domain Boundary Auditor
                </span>
                <span className={`text-xs font-bold uppercase ${selectedScenario.status === "FAIL_DRIFT" ? "text-red-600" : "text-emerald-600"}`}>
                  {selectedScenario.status === "FAIL_DRIFT" ? "Veto / Block" : "Approved"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedScenario.status === "FAIL_DRIFT"
                  ? "Parallel persistence created outside ILedgerCommandService domain boundary."
                  : "Strict separation of concerns maintained; domain contracts honored."}
              </p>
            </div>

            {/* Agent 3: SQL / Ledger Guardian */}
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Agent 3: SQL & Ledger Guardian
                </span>
                <span className={`text-xs font-bold uppercase ${selectedScenario.status === "FAIL_SECURITY" ? "text-red-600" : "text-emerald-600"}`}>
                  {selectedScenario.status === "FAIL_SECURITY" ? "Veto / Block" : "Approved"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedScenario.status === "FAIL_SECURITY"
                  ? "Missing @TenantId predicate violates multi-tenant isolation policy."
                  : "Clustered indexes and tenant isolation criteria verified."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
