"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Zap, 
  Workflow, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ChevronUp, 
  ChevronDown,
  Cpu,
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const evaluationPaths = [
    {
      id: "simulator",
      badge: "Core Firewall",
      title: "1. Test Drift Interception",
      summary: "Simulate an AI agent generating illegal direct ledger writes or missing tenant SQL filters. Watch Roslyn intercept it in <15s.",
      cta: "Test Drift Simulator",
      icon: ShieldCheck,
      color: "emerald",
    },
    {
      id: "auditor",
      badge: "Dual-AI Engine",
      title: "2. Audit Custom Code Live",
      summary: "Paste your own C# or SQL code and watch 3 specialized subagents conduct an adversarial boundary audit with live latency telemetry.",
      cta: "Open AI Auditor",
      icon: Zap,
      color: "indigo",
    },
    {
      id: "workflows",
      badge: "Event-Driven DAGs",
      title: "3. Workflows & ERP APIs",
      summary: "Inspect Inngest durable state machines, test live REST/Webhook ERP endpoints, and simulate automated retries.",
      cta: "Inspect Workflows",
      icon: Workflow,
      color: "blue",
    },
    {
      id: "roadmap",
      badge: "Engineering Strategy",
      title: "4. 35-Engineer Operating Model",
      summary: "Review the 6-stage daily developer loop, 4-phase enterprise rollout, and senior architect blast shield saving 22.8 hrs/week.",
      cta: "View Operating Model",
      icon: Terminal,
      color: "purple",
    },
  ];

  return (
    <section className="w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all">
      {/* Top Value Banner */}
      <div className="p-4 sm:p-5 border-b border-slate-200/70 dark:border-slate-800/80 bg-linear-to-r from-indigo-50/50 via-white to-slate-50/50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-600 text-white shadow-2xs">
              SquidERP Control Plane
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              AI-Native Governance & Architectural Drift Firewall
            </span>
            <Badge variant="outline" className="text-xs font-mono border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30">
              Verified Production Model
            </Badge>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            How to Evaluate This Production Control Plane
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
            This system prevents AI-generated code drift across mature .NET and SQL Server ERP architectures. Select any of the 4 live interactive evaluation paths below to inspect the deterministic compiler gates, multi-agent audits, or enterprise operating model.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          >
            {isCollapsed ? (
              <>
                <span>Expand Guide</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span>Collapse Guide</span>
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Interactive Evaluation Paths */}
      {!isCollapsed && (
        <div className="p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-900/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {evaluationPaths.map((item) => {
              const Icon = item.icon;
              const isCurrent = activeTab === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "border-indigo-500 bg-white shadow-md ring-2 ring-indigo-500/20 dark:bg-slate-800 dark:border-indigo-400"
                      : "border-slate-200 bg-white/80 hover:border-indigo-300 hover:shadow-xs dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-slate-700"
                  }`}
                >
                  {/* Top Accent Pill */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isCurrent
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                      }`}>
                        {item.badge}
                      </span>
                      {isCurrent && (
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" title="Active View" />
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className={`inline-flex items-center justify-between w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isCurrent
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700 dark:bg-slate-700 dark:text-slate-200 dark:group-hover:bg-slate-600"
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      {item.cta}
                    </span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3-Layer Architectural Defense Legend */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-700 dark:text-slate-300">3-Layer Defense:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                1. Roslyn AST Gates (&lt;15s)
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                2. 3-Agent Triad (1.8s)
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                3. Staff Architect Blast Shield (8% High-Risk Only)
              </span>
            </div>
            <button
              onClick={onOpenBlueprints}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 shrink-0 self-start md:self-auto"
            >
              Export Turnkey Production Blueprints →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
