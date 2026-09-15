"use client";

import React from "react";
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Users, 
  AlertOctagon,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function WorkflowCanvas() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [stepStates, setStepStates] = React.useState<string[]>([
    "ARMED",
    "IDLE",
    "IDLE",
    "IDLE",
    "IDLE",
    "IDLE",
  ]);

  const nodes = [
    {
      id: 1,
      title: "01. Intake & Specs",
      subtitle: "Gherkin Contracts",
      badge: "AST Linter",
      icon: FileText,
      gate: "Spec Schema",
      metric: "100% Valid",
      description: "Business & technical requirements mapped to typed domain entities before coding.",
    },
    {
      id: 2,
      title: "02. Context Packs",
      subtitle: "Bounded Domains",
      badge: ".claude/rules",
      icon: Layers,
      gate: "Symbol Graph",
      metric: "Sub-15k Tokens",
      description: "Injects Accounting or Sync domain context packs, avoiding full-repo context bloat.",
    },
    {
      id: 3,
      title: "03. Coding Agents",
      subtitle: "Claude Code / Codex",
      badge: "Sandboxed",
      icon: Cpu,
      gate: "Git Worktree",
      metric: "Isolated Branch",
      description: "Multiple coding agents work concurrently in isolated worktrees with strict rules.",
    },
    {
      id: 4,
      title: "04. Drift Firewall",
      subtitle: "Compiler Gate",
      badge: "Roslyn + SQL",
      icon: ShieldCheck,
      gate: "Roslyn CI Gate",
      metric: "42 Rules Checked",
      description: "100% deterministic static gate blocking rogue ledger writes and unindexed SQL.",
    },
    {
      id: 5,
      title: "05. Agent Review",
      subtitle: "Adversarial Triad",
      badge: "Consensus",
      icon: AlertOctagon,
      gate: "3 Subagents",
      metric: "98% Consensus",
      description: "Specialized agents audit concurrency, domain boundaries, and ledger idempotency.",
    },
    {
      id: 6,
      title: "06. Human Gate",
      subtitle: "Staff Architect",
      badge: "One-Click",
      icon: Users,
      gate: "Ledger Guard",
      metric: "High-Blast Only",
      description: "Human architect approves financial ledger mutations and database schema migrations.",
    },
  ];

  const handleSimulate = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);
    setStepStates(["RUNNING", "IDLE", "IDLE", "IDLE", "IDLE", "IDLE"]);

    // Sequentially activate nodes
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current <= 6) {
        setActiveStep(current);
        setStepStates((prev) => {
          const next = [...prev];
          next[current - 2] = "VERIFIED";
          next[current - 1] = "RUNNING";
          return next;
        });
      } else {
        clearInterval(interval);
        setStepStates(["VERIFIED", "VERIFIED", "VERIFIED", "VERIFIED", "VERIFIED", "VERIFIED"]);
        setIsRunning(false);
      }
    }, 750);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsRunning(false);
    setStepStates(["ARMED", "IDLE", "IDLE", "IDLE", "IDLE", "IDLE"]);
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm p-4 sm:p-5 mb-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Autonomous Engineering Pipeline & Governance Loop
            </h3>
            <Badge variant="brand" className="text-xs font-mono">
              Live State Machine
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sequential execution flow from analyst intake to deterministic compilation and human sign-off
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            disabled={isRunning}
            className="text-xs font-semibold whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
          <Button
            size="sm"
            variant="brand"
            onClick={handleSimulate}
            disabled={isRunning}
            className="text-xs font-semibold whitespace-nowrap shrink-0 shadow-sm"
          >
            {isRunning ? (
              <>
                <Sparkles className="h-3.5 w-3.5 mr-1 animate-spin text-amber-300" />
                Validating Pipeline...
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 mr-1" />
                Simulate Governance Pass
              </>
            )}
          </Button>
        </div>
      </div>

      {/* SVG Canvas & Node Cards */}
      <div className="relative">
        {/* Animated Connector Wire (Desktop xl) */}
        <div className="hidden xl:block absolute top-[52px] left-[6%] right-[6%] h-[2px] z-0">
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 relative">
            {/* Ambient Traveling Pulse */}
            <div
              className={`absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-700 ${
                isRunning ? "animate-[pulse_1s_ease-in-out_infinite]" : "opacity-40"
              }`}
              style={{
                left: activeStep === 0 ? "0%" : `${((activeStep - 1) / 5) * 80}%`,
              }}
            ></div>
          </div>
        </div>

        {/* 6 Sequential Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 relative z-10">
          {nodes.map((n, idx) => {
            const Icon = n.icon;
            const state = stepStates[idx];
            const isCurrent = activeStep === n.id;

            return (
              <div
                key={n.id}
                className={`p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isCurrent
                    ? "border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-md ring-2 ring-indigo-500/20"
                    : state === "VERIFIED"
                    ? "border-emerald-200 bg-emerald-50/20 dark:border-emerald-900 dark:bg-emerald-950/10"
                    : "border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-850/50"
                }`}
              >
                <div>
                  {/* Top Badge & State Indicator */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                      NODE {n.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap shrink-0 ${
                        state === "VERIFIED"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : state === "RUNNING"
                          ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 animate-pulse"
                          : state === "ARMED"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {state === "VERIFIED" && <CheckCircle2 className="h-2.5 w-2.5" />}
                      {state}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isCurrent
                          ? "bg-indigo-600 text-white"
                          : state === "VERIFIED"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {n.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        {n.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-3 leading-relaxed">
                    {n.description}
                  </p>
                </div>

                {/* Structured Gate & Target Metric Rows (Zero Truncation / Zero Clashing) */}
                <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">Gate:</span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold">{n.gate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">Target:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                      {n.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
