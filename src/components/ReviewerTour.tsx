"use client";

import React from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Cpu, Download, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ReviewerTourProps {
  onSelectTab: (tab: string) => void;
  onOpenBlueprints: () => void;
  activeTab: string;
}

export function ReviewerTour({
  onSelectTab,
  onOpenBlueprints,
  activeTab,
}: ReviewerTourProps) {
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([1]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const steps = [
    {
      num: 1,
      tag: "Drift Firewall",
      title: "Roslyn & AST Quality Gates",
      desc: "Observe how deterministic C# analyzers intercept illegal ledger writes & missing tenant SQL filters before human review.",
      action: () => {
        onSelectTab("simulator");
        if (!completedSteps.includes(1)) toggleStep(1);
      },
      btnText: "Test Firewall",
      icon: ShieldCheck,
      isActive: activeTab === "simulator",
    },
    {
      num: 2,
      tag: "Workflows & APIs",
      title: "Durable DAGs & REST Sync",
      desc: "Inspect Inngest event state machines, ERP REST/Webhook test consoles, and 3-agent adversarial consensus scoring.",
      action: () => {
        onSelectTab("workflows");
        if (!completedSteps.includes(2)) toggleStep(2);
      },
      btnText: "Test Workflows",
      icon: Workflow,
      isActive: activeTab === "workflows",
    },
    {
      num: 3,
      tag: "Dual-AI Engine",
      title: "Live Multi-Agent Auditor",
      desc: "Paste real C# or SQL code and watch 3 specialized subagents conduct an adversarial audit with live latency telemetry.",
      action: () => {
        onSelectTab("auditor");
        if (!completedSteps.includes(3)) toggleStep(3);
      },
      btnText: "Audit Code",
      icon: Zap,
      isActive: activeTab === "auditor",
    },
    {
      num: 4,
      tag: "10 RFP Answers",
      title: "Operating Tenets Matrix",
      desc: "Review comprehensive architectural blueprints answering all 10 brief requirements for scaling AI across SquidERP.",
      action: () => {
        onSelectTab("tenets");
        if (!completedSteps.includes(4)) toggleStep(4);
      },
      btnText: "Inspect Tenets",
      icon: Cpu,
      isActive: activeTab === "tenets",
    },
  ];

  const progressPercent = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <section className="w-full py-4 border-b border-slate-200 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900 dark:border-slate-800">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Top Header & Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold font-mono">
              30s
            </span>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Executive Diagnostic Tour & Architectural Evaluation
            </h2>
            <Badge variant="brand" className="text-xs font-mono">
              Verified Control Plane
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Audit Progress: <strong className="font-mono text-indigo-600 dark:text-indigo-400">{completedSteps.length}/4 Verified</strong>
            </span>
            <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 4 Sequential Guided Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((s) => {
            const Icon = s.icon;
            const isDone = completedSteps.includes(s.num);

            return (
              <div
                key={s.num}
                className={`flex flex-col justify-between p-3.5 rounded-xl border transition-all ${
                  s.isActive
                    ? "border-indigo-500 bg-white shadow-sm ring-1 ring-indigo-500 dark:bg-slate-800 dark:border-indigo-400"
                    : "border-slate-200 bg-white/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Step 0{s.num}
                    </span>
                    <button
                      onClick={() => toggleStep(s.num)}
                      className="text-slate-400 hover:text-emerald-500 transition-colors"
                      title={isDone ? "Mark unverified" : "Mark verified"}
                    >
                      <CheckCircle2
                        className={`h-4 w-4 ${
                          isDone
                            ? "text-emerald-500 fill-emerald-50 dark:fill-emerald-950/20"
                            : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    </button>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <button
                  onClick={s.action}
                  className="inline-flex items-center justify-between w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-900 hover:text-indigo-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 transition-colors whitespace-nowrap shrink-0"
                >
                  <span className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-indigo-500" />
                    {s.btnText}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
