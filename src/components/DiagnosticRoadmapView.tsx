"use client";

import React, { useState } from "react";
import { 
  DIAGNOSTIC_ROADMAP, 
  OperatingPhase 
} from "@/data/governanceData";
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers,
  Terminal,
  Workflow,
  Cpu,
  FileCode,
  Users,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  BarChart3,
  GitBranch,
  FileText,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DiagnosticRoadmapView() {
  const [activeViewMode, setActiveViewMode] = useState<"loop" | "phases" | "transformation">("loop");
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(0);
  const [selectedLoopStage, setSelectedLoopStage] = useState<number>(0);
  
  // Interactive PR Simulation state
  const [simRiskTier, setSimRiskTier] = useState<"low" | "high">("high");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const loopStages = [
    {
      id: 1,
      title: "Stage 01: Intake & Contracts",
      actor: "Business Analyst & Lead",
      tools: "Gherkin Specs, Zod Schema AST",
      deterministicSplit: "100% Deterministic Contract",
      driftPrevented: "Prevents vague user stories from triggering hallucinated schema mutations.",
      description: "Business requirements are converted into typed Gherkin contracts with explicit pre/post-conditions before any agent writes code.",
      artifact: "contracts/OrderPlacement.contract.json",
      badge: "Input Gate",
    },
    {
      id: 2,
      title: "Stage 02: Bounded Context Slicing",
      actor: "Context Slicing Engine",
      tools: "Symbol Graph, Git Worktrees",
      deterministicSplit: "AST Dependency Analysis",
      driftPrevented: "Prevents full-repo 500k-token context explosion and cross-module boundary pollution.",
      description: "Agents receive only the relevant bounded domain (e.g. Accounting.Domain, sub-15k tokens) in an isolated git worktree.",
      artifact: ".claude/context-packs/accounting.pack.md",
      badge: "Context Gate",
    },
    {
      id: 3,
      title: "Stage 03: Parallel Coding Agents",
      actor: "Claude Code / Codex Agents",
      tools: ".claude/rules, LSP Diagnostics",
      deterministicSplit: "Guided LLM Code Gen",
      driftPrevented: "Enforces strict coding standards, preventing legacy WPF UI deadlocks and raw ADO.NET calls.",
      description: "Multiple coding agents work concurrently in sandboxed branches with continuous LSP feedback.",
      artifact: "src/SquidERP.Accounting/OrderProcessor.cs",
      badge: "Execution",
    },
    {
      id: 4,
      title: "Stage 04: Deterministic Roslyn CI Gate",
      actor: "TeamCity CI / MSBuild",
      tools: "42 Custom C# Roslyn Analyzers",
      deterministicSplit: "100% Deterministic (Zero Hallucination)",
      driftPrevented: "Catches direct ledger mutations (ERP-ARCH-001) and missing tenant SQL filters in <15 seconds.",
      description: "Deterministic compiler analyzers execute on every commit. If an architectural rule fails, the build breaks immediately.",
      artifact: "build/reports/roslyn-drift-gate.xml",
      badge: "Hard Firewall",
    },
    {
      id: 5,
      title: "Stage 05: Multi-Agent Consensus",
      actor: "Adversarial Triad",
      tools: "GPT-4o-mini, Gemini 2.0 Flash",
      deterministicSplit: "Consensus Voting & Confidence",
      driftPrevented: "Intercepts subtle concurrency race conditions, async deadlocks, and boundary leaks.",
      description: "Three specialized subagents (Concurrency, Boundaries, Ledger) audit the pull request in parallel in 1.8 seconds.",
      artifact: "audit/agent-consensus-report.json",
      badge: "Semantic Gate",
    },
    {
      id: 6,
      title: "Stage 06: Human Blast Shield",
      actor: "Staff Systems Architect",
      tools: "One-Click Escalation Cockpit",
      deterministicSplit: "Human Judgement (High-Risk Only)",
      driftPrevented: "Senior architects review ONLY the 8% high-blast mutations (Ledger & Schema), saving 22+ hours/week.",
      description: "Low-risk PRs auto-merge in <45 seconds. Only sensitive mutations trigger a Staff Architect sign-off request.",
      artifact: "approvals/ledger-mutation-signoff.jwt",
      badge: "Human Shield",
    },
  ];

  const handleRunSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    let current = 1;
    const timer = setInterval(() => {
      current += 1;
      if (current <= 6) {
        setSimStep(current);
      } else {
        clearInterval(timer);
        setIsSimulating(false);
      }
    }, 700);
  };

  const currentPhase = DIAGNOSTIC_ROADMAP[selectedPhaseIdx] || DIAGNOSTIC_ROADMAP[0];
  const activeLoopData = loopStages[selectedLoopStage] || loopStages[0];

  return (
    <div className="w-full space-y-4">
      {/* Top Banner & Perspective Switcher */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shadow-xs">
                OM
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Enterprise AI Engineering Operating Model
              </h3>
              <Badge variant="brand" className="text-xs font-mono">
                SquidERP Production Model
              </Badge>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Zero Architectural Drift
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 max-w-3xl leading-relaxed">
              How a 35-engineer team safely scales AI development across mature .NET and SQL Server architectures: Combining deterministic compiler gates, bounded context slicing, and parallel agentic review to stop architectural erosion.
            </p>
          </div>

          {/* Perspective Navigation Bar (Brevity Law: ≤ 18 chars, whitespace-nowrap) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 shrink-0 self-start lg:self-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveViewMode("loop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                activeViewMode === "loop"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Workflow className="h-3.5 w-3.5 text-indigo-500" />
              Daily Dev Loop
            </button>
            <button
              onClick={() => setActiveViewMode("phases")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                activeViewMode === "phases"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-blue-500" />
              Phased Rollout (1–4)
            </button>
            <button
              onClick={() => setActiveViewMode("transformation")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                activeViewMode === "transformation"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5 text-emerald-500" />
              Velocity & ROI
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PERSPECTIVE 1: THE 6-STAGE DAILY OPERATING LOOP */}
        {/* ============================================================ */}
        {activeViewMode === "loop" && (
          <div className="mt-4 space-y-4">
            {/* Top Interactive Flow Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  Click any stage to inspect operating mechanics & safeguards:
                </span>
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  Step 0{selectedLoopStage + 1} of 06
                </span>
              </div>

              {/* 6 Stage Buttons Flow */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {loopStages.map((stage, idx) => {
                  const isSelected = selectedLoopStage === idx;
                  const isSimActive = isSimulating && simStep === stage.id;
                  const isSimPassed = isSimulating && simStep > stage.id;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedLoopStage(idx)}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                        isSimActive
                          ? "border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 ring-2 ring-amber-500"
                          : isSelected
                          ? "border-indigo-500 bg-indigo-50/30 dark:border-indigo-500/80 dark:bg-indigo-950/30 ring-1 ring-indigo-500/30 shadow-xs"
                          : "border-slate-200 dark:border-slate-800 bg-slate-50/50 hover:border-slate-300 dark:bg-slate-850 dark:hover:border-slate-700"
                      }`}
                    >
                      {/* Top Accent Line */}
                      <div className={`absolute top-0 inset-x-0 h-0.5 ${
                        isSelected ? "bg-indigo-600 dark:bg-indigo-400" : "bg-transparent"
                      }`} />

                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                          0{stage.id}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {stage.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {stage.title.split(": ")[1]}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-mono">
                        {stage.actor}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Detail Card */}
            <div className="p-4 sm:p-5 rounded-xl border border-indigo-200/70 dark:border-indigo-900/60 bg-linear-to-br from-indigo-50/30 via-white to-white dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-white font-mono text-xs font-bold">
                    0{activeLoopData.id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeLoopData.title}
                  </h4>
                  <Badge variant="outline" className="text-xs font-mono border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                    {activeLoopData.badge}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>Actor: <strong className="text-slate-800 dark:text-slate-200">{activeLoopData.actor}</strong></span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {activeLoopData.description}
              </p>

              {/* 3-Column Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Enforced Tools & Tech:
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">
                    {activeLoopData.tools}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                    Deterministic vs AI Split:
                  </span>
                  <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                    {activeLoopData.deterministicSplit}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                    Drift Failure Stopped:
                  </span>
                  <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                    {activeLoopData.driftPrevented}
                  </p>
                </div>
              </div>

              {/* Concrete Generated Artifact */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <FileCode className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-slate-500">Output Artifact:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activeLoopData.artifact}</span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Automated Sign-Off
                </span>
              </div>
            </div>

            {/* Interactive PR Lifecycle Simulator */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Simulate Operating Model on Live PR:
                  </h4>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setSimRiskTier("low")}
                      className={`px-2 py-0.5 text-xs font-mono font-medium rounded ${
                        simRiskTier === "low"
                          ? "bg-emerald-600 text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      Low-Risk (UI Component)
                    </button>
                    <button
                      onClick={() => setSimRiskTier("high")}
                      className={`px-2 py-0.5 text-xs font-mono font-medium rounded ${
                        simRiskTier === "high"
                          ? "bg-amber-600 text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      High-Risk (GeneralLedger Write)
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {simRiskTier === "low"
                    ? "Low-risk PRs pass Roslyn & Multi-Agent review, auto-merging in <45s without waking senior architects."
                    : "High-risk ledger mutations trigger Roslyn ERP-ARCH-001 and require mandatory Staff Architect sign-off."}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="brand"
                  size="sm"
                  onClick={handleRunSim}
                  disabled={isSimulating}
                  className="text-xs font-semibold whitespace-nowrap h-8"
                >
                  <Play className="h-3 w-3 mr-1" />
                  {isSimulating ? `Evaluating Stage 0${simStep}...` : "Simulate Flow"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PERSPECTIVE 2: PHASED ROLLOUT (PHASES 1–4) */}
        {/* ============================================================ */}
        {activeViewMode === "phases" && (
          <div className="mt-4 space-y-4">
            {/* Phase Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {DIAGNOSTIC_ROADMAP.map((p, idx) => {
                const isSelected = selectedPhaseIdx === idx;
                return (
                  <button
                    key={p.phase}
                    onClick={() => setSelectedPhaseIdx(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-white dark:bg-slate-850 shadow-sm ring-1 ring-indigo-500/30"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 hover:border-slate-300 dark:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                        {p.phase}
                      </span>
                      <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                        {p.duration}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate font-mono">
                      {p.track}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Phase Comprehensive Inspection Card */}
            <div className="p-5 rounded-xl border border-indigo-200/80 dark:border-indigo-900/80 bg-white dark:bg-slate-850 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-600 text-white">
                      {currentPhase.phase}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentPhase.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Track: <strong className="text-slate-700 dark:text-slate-300 font-mono">{currentPhase.track}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    <Clock className="h-3 w-3 text-indigo-500" />
                    Timeline: {currentPhase.duration}
                  </span>
                </div>
              </div>

              {/* Focus Statement */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Strategic Engineering Objective:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentPhase.focus}
                </p>
              </div>

              {/* Key Deliverables Grid */}
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  Concrete Production Deliverables & Quality Gates:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentPhase.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5 shadow-2xs"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-700 dark:text-slate-300 leading-snug font-medium">
                        {del}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Governance Guarantee Callout */}
              <div className="p-3 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>Enterprise Guarantee:</strong> Zero production downtime during rollout. Roslyn rules run in advisory mode on Day 1, transitioning to hard blocking in TeamCity.
                  </span>
                </div>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold whitespace-nowrap shrink-0 ml-2">
                  100% Deterministic
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PERSPECTIVE 3: VELOCITY & ROI TRANSFORMATION */}
        {/* ============================================================ */}
        {activeViewMode === "transformation" && (
          <div className="mt-4 space-y-4">
            {/* 5 Transformation Benchmark Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              
              {/* Metric 1: PR Cycle Time */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  PR Cycle Time
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    3.5 Hours
                  </span>
                  <span className="text-xs font-mono text-slate-400 line-through">4.2 Days</span>
                </div>
                <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  96% Faster Merges
                </div>
              </div>

              {/* Metric 2: Architectural Drift */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Prod Drift Incidents
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    0 / Quarter
                  </span>
                  <span className="text-xs font-mono text-slate-400 line-through">14 / Qtr</span>
                </div>
                <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  100% Intercepted
                </div>
              </div>

              {/* Metric 3: Token Burn / Prompt */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Context Window Burn
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    15k Tokens
                  </span>
                  <span className="text-xs font-mono text-slate-400 line-through">128k</span>
                </div>
                <div className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  84% Token Cut
                </div>
              </div>

              {/* Metric 4: Senior Review Hours */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Staff PR Review Time
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    3.2 Hrs/Wk
                  </span>
                  <span className="text-xs font-mono text-slate-400 line-through">26 Hrs</span>
                </div>
                <div className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  22.8 Hrs Saved/Wk
                </div>
              </div>

              {/* Metric 5: Audit Compliance */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Audit Trail Logging
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    100% Auto
                  </span>
                  <span className="text-xs font-mono text-slate-400 line-through">Manual</span>
                </div>
                <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Tamper-Evident
                </div>
              </div>

            </div>

            {/* Side-by-Side Architectural Transformation Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Left Column: Without Operating Model */}
              <div className="p-4 rounded-xl border border-rose-200/80 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-rose-900 dark:text-rose-200">
                    Without Operating Model (Unguided LLMs & Prompt Slop):
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-rose-950/80 dark:text-rose-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span><strong>Full-Repo Context Pollution:</strong> Agents fed 500k lines of code hallucinate deprecated ADO.NET patterns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span><strong>Silent Architectural Drift:</strong> Rogue ledger mutations bypass double-entry GAAP validation undetected.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span><strong>Senior Engineer Exhaustion:</strong> Staff architects spend 65% of their week reviewing line-by-line AI-generated code.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span><strong>SQL Deadlocks & Tenant Leaks:</strong> AI queries omit <code>WHERE TenantId = @id</code>, breaching customer data privacy.</span>
                  </li>
                </ul>
              </div>

              {/* Right Column: With AgenticGate Operating Model */}
              <div className="p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    With AgenticGate Operating Model (Deterministic & Guarded):
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-emerald-950/80 dark:text-emerald-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Bounded Slicing:</strong> Sub-15k token domain symbol graphs keep Claude Code focused and token-efficient.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Compiler-Enforced Guardrails:</strong> 42 Roslyn rules fail builds in &lt;15s if clean boundaries are violated.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Staff Architect Blast Shield:</strong> 92% of PRs auto-merge safely; humans intervene ONLY on ledger mutations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Zero Cross-Tenant Leaks:</strong> Strict AST static analyzers guarantee tenant isolation in every query.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
