"use client";

import React from "react";
import { 
  DIAGNOSTIC_ROADMAP, 
  OperatingPhase 
} from "@/data/governanceData";
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DiagnosticRoadmapView() {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Enterprise AI Architecture & Governance Implementation Roadmap
              </h3>
              <Badge variant="brand" className="text-xs font-mono">
                Phase 1 to Phase 4
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Structured engineering rollout: Commencing with an in-depth codebase audit before establishing repository rules, deterministic Roslyn compiler gates, and legacy modernization frameworks.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Enterprise Implementation Plan
            </span>
          </div>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-3">
          {DIAGNOSTIC_ROADMAP.map((p, idx) => (
            <div
              key={p.phase}
              className={`p-4 rounded-xl border transition-all ${
                idx === 0
                  ? "border-indigo-300 bg-indigo-50/20 dark:border-indigo-900 dark:bg-indigo-950/20 ring-1 ring-indigo-500/20"
                  : "border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-850"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                    {p.phase}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {p.name}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-indigo-500" />
                    {p.duration}
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 text-xs">
                    {p.track}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                {p.focus}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/70 dark:border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Key Production Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {p.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
