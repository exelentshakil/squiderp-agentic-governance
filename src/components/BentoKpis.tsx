"use client";

import React from "react";
import { ShieldCheck, Zap, Database, Clock, FileCode, CheckCircle2 } from "lucide-react";

export function BentoKpis() {
  return (
    <section className="w-full py-2 px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Bento Card 1 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Drift Block
            </span>
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
              99.4%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              Blocked at Roslyn
            </p>
          </div>
        </div>

        {/* Bento Card 2 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Review Speed
            </span>
            <Zap className="h-4 w-4 text-indigo-500 shrink-0" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
              1.8s
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              Parallel 3-Agent
            </p>
          </div>
        </div>

        {/* Bento Card 3 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Isolation
            </span>
            <Database className="h-4 w-4 text-blue-500 shrink-0" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
              100%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              Zero Tenant Leaks
            </p>
          </div>
        </div>

        {/* Bento Card 4 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              CI/CD SLA
            </span>
            <Clock className="h-4 w-4 text-amber-500 shrink-0" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
              &lt; 45s
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              TeamCity Gates
            </p>
          </div>
        </div>

        {/* Bento Card 5 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Context Cut
            </span>
            <FileCode className="h-4 w-4 text-indigo-500 shrink-0" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
              84%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              Bounded Slicing
            </p>
          </div>
        </div>

        {/* Bento Card 6 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Human Gate
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
              High-Risk
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              Ledger & DDL Only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
