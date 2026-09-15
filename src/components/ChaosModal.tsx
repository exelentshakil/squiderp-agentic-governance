"use client";

import React, { useState } from "react";
import { 
  AlertTriangle, 
  Flame, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  Server, 
  CheckCircle2, 
  XCircle,
  Clock
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

interface ChaosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChaosModal({ open, onOpenChange }: ChaosModalProps) {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [logs, setLogs] = useState<Array<{ step: string; status: "pending" | "success" | "warning" | "failed"; time: string }>>([]);
  const [statusMessage, setStatusMessage] = useState<string>("Standby. Select a failure scenario to simulate.");

  const runSimulation = (scenario: "openai-outage" | "gemini-rate-limit" | "disobedient-agent") => {
    setActiveTest(scenario);
    setLogs([]);
    setStatusMessage("Injecting chaos fault into governance runtime...");

    if (scenario === "openai-outage") {
      setLogs([
        { step: "Triggering PR audit on SquidErp.Ledger.Core #1482", status: "pending", time: "0ms" },
      ]);

      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          { step: "Primary Provider: OpenAI gpt-4o-mini request sent", status: "pending", time: "120ms" },
          { step: "OpenAI API returned HTTP 503 Service Unavailable / Timeout", status: "failed", time: "450ms" },
        ]);
        setStatusMessage("OpenAI failed. Circuit breaker tripped. Initiating automatic fallback...");
      }, 700);

      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          { step: "Failover Provider: Google Gemini 2.0 Flash engaged", status: "warning", time: "520ms" },
          { step: "Gemini executed 3-agent consensus audit in 310ms", status: "success", time: "830ms" },
          { step: "Audit Verdict generated with zero downtime for TeamCity CI", status: "success", time: "850ms" },
        ]);
        setStatusMessage("Simulation complete: 100% resilient dual-provider failover executed.");
        setActiveTest(null);
      }, 1800);
    } else if (scenario === "gemini-rate-limit") {
      setLogs([
        { step: "Injecting concurrent 429 Too Many Requests on secondary provider", status: "pending", time: "0ms" },
      ]);

      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          { step: "Both external cloud LLM providers simulated offline", status: "failed", time: "300ms" },
          { step: "Circuit breaker activated: switching to Local AST Deterministic Engine", status: "warning", time: "420ms" },
        ]);
        setStatusMessage("External AI unavailable. Activating offline deterministic safety fallback...");
      }, 600);

      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          { step: "Local Roslyn C# syntax parser scanned 4 changed files", status: "success", time: "510ms" },
          { step: "Flagged ERP-ARCH-001 (direct GeneralLedger mutation) deterministically", status: "success", time: "530ms" },
          { step: "PR blocked with zero cloud dependency. TeamCity gate passed.", status: "success", time: "550ms" },
        ]);
        setStatusMessage("Simulation complete: Offline AST engine protected architectural boundaries.");
        setActiveTest(null);
      }, 1600);
    } else {
      // Disobedient agent
      setLogs([
        { step: "Coding Agent ignores .claude/rules and attempts direct SQL table alter", status: "pending", time: "0ms" },
      ]);

      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          { step: "Agent generated PR removing @TenantId predicate to fix query speed", status: "failed", time: "200ms" },
          { step: "Tier 1 Gate: SQL migration linter detected missing tenant partition key", status: "warning", time: "320ms" },
        ]);
        setStatusMessage("Agent disobedience intercepted. Tier 1 firewall enforcing strict block...");
      }, 600);

      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          { step: "PR flagged with BLOCK: SQL-SEC-014 (Tenant isolation breach)", status: "failed", time: "450ms" },
          { step: "Agent sandbox constrained; auto-remediation prompt dispatched to agent", status: "success", time: "680ms" },
          { step: "Zero bad code reached human reviewers or master branch", status: "success", time: "700ms" },
        ]);
        setStatusMessage("Simulation complete: Deterministic firewall overrules disobedient agent.");
        setActiveTest(null);
      }, 1600);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-5 pb-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-crimson-600 dark:text-crimson-400" />
              <DialogTitle className="text-base font-bold text-slate-900 dark:text-white">
                Chaos Engine & Resilience Testing
              </DialogTitle>
            </div>
            <Badge variant="destructive" className="font-mono text-xs">
              Live Failure Injection
            </Badge>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Verify how SquidERP's governance pipeline handles upstream OpenAI outages, token exhaustion, and disobedient agents.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-4">
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={activeTest !== null}
              onClick={() => runSimulation("openai-outage")}
              className="text-xs h-auto py-2.5 px-3 flex flex-col items-start gap-1 text-left border-slate-200 dark:border-slate-800 hover:border-amber-400"
            >
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                <Server className="h-3.5 w-3.5 text-amber-500" />
                OpenAI Outage
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Simulate 503 crash and auto-failover to Gemini
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={activeTest !== null}
              onClick={() => runSimulation("gemini-rate-limit")}
              className="text-xs h-auto py-2.5 px-3 flex flex-col items-start gap-1 text-left border-slate-200 dark:border-slate-800 hover:border-crimson-400"
            >
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                <AlertTriangle className="h-3.5 w-3.5 text-crimson-500" />
                Cloud Outage
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Fallback to offline Roslyn AST engine
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={activeTest !== null}
              onClick={() => runSimulation("disobedient-agent")}
              className="text-xs h-auto py-2.5 px-3 flex flex-col items-start gap-1 text-left border-slate-200 dark:border-slate-800 hover:border-purple-400"
            >
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                <Zap className="h-3.5 w-3.5 text-purple-500" />
                Rogue Agent PR
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Deterministic firewall blocks illegal DDL
              </span>
            </Button>
          </div>

          {/* Status banner */}
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeTest ? "bg-amber-400" : "bg-emerald-400"} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${activeTest ? "bg-amber-500" : "bg-emerald-500"}`}></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                {statusMessage}
              </span>
            </div>
            {activeTest && (
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-slate-400" />
            )}
          </div>

          {/* Real-time Telemetry Log Window */}
          <div className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs space-y-2 min-h-[180px] max-h-[220px] overflow-y-auto">
            <div className="text-slate-500 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>CHAOS INJECTION MONITOR</span>
              <span>SQUID-CHAOS-v2.1</span>
            </div>
            {logs.length === 0 ? (
              <div className="text-slate-600 italic py-6 text-center">
                Click a test above to inject failure and trace the automatic recovery response.
              </div>
            ) : (
              logs.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 py-0.5 leading-tight">
                  <span className="text-slate-500 shrink-0 text-xs w-12 font-mono">{item.time}</span>
                  {item.status === "success" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />}
                  {item.status === "warning" && <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />}
                  {item.status === "failed" && <XCircle className="h-3.5 w-3.5 text-crimson-400 shrink-0 mt-0.5" />}
                  {item.status === "pending" && <Clock className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />}
                  <span className={`text-xs ${
                    item.status === "failed" ? "text-crimson-300" :
                    item.status === "warning" ? "text-amber-300" :
                    item.status === "success" ? "text-emerald-300" : "text-slate-300"
                  }`}>
                    {item.step}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
