"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Zap, 
  Database, 
  Clock, 
  FileCode, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  Activity,
  Server,
  Layers,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoKpis() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-1">
      {/* 6 High-Density Enterprise Bento KPI Cards with Coolify Observability Styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        
        {/* CARD 1: Drift Block - 99.4% */}
        <div 
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-linear-to-b from-white via-white to-slate-50/60 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950 p-4 shadow-xs hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-200 flex flex-col justify-between group"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-emerald-500/80 via-teal-400/80 to-transparent" />
          
          <div>
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Drift Block
              </span>
              <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900/60">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              </div>
            </div>

            {/* Metric & Trajectory */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
                99.4%
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                <ArrowUpRight className="h-3 w-3" />
                +27.0%
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              Blocked at Roslyn
            </p>

            {/* Coolify Mini Area Sparkline Chart (SVG) */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="h-10 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 36" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Dashed Target Baseline */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#10b981" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.4" />
                  {/* Filled Area */}
                  <polygon 
                    points="0,32 0,26 16,22 33,18 50,14 66,9 83,6 100,2 100,36 0,36" 
                    fill="url(#emeraldGrad)" 
                  />
                  {/* Stroke Line */}
                  <polyline 
                    points="0,26 16,22 33,18 50,14 66,9 83,6 100,2" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="1.75" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  {/* Current Active Dot */}
                  <circle cx="100" cy="2" r="2.5" fill="#10b981" className="animate-pulse" />
                </svg>
              </div>
            </div>
          </div>

          {/* Micro-Telemetry Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>1,428 / 1,436 Violations</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0 in Prod</span>
          </div>
        </div>

        {/* CARD 2: Review Speed - 1.8s */}
        <div 
          onMouseEnter={() => setHoveredIndex(2)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-linear-to-b from-white via-white to-slate-50/60 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950 p-4 shadow-xs hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-200 flex flex-col justify-between group"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-indigo-500/80 via-purple-400/80 to-transparent" />
          
          <div>
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                Review Speed
              </span>
              <div className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-900/60">
                <Zap className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              </div>
            </div>

            {/* Metric & Subtitle */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
                1.8s
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                p95: 2.1s
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              Parallel 3-Agent
            </p>

            {/* Coolify Comparative Latency Bar Chart (SVG) */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="h-10 w-full flex flex-col justify-center gap-1.5 text-xs font-mono">
                {/* Bar 1: Manual PR */}
                <div className="flex items-center gap-2">
                  <span className="w-9 text-slate-500 dark:text-slate-400 shrink-0">Human</span>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 dark:bg-slate-700 rounded-full w-full"></div>
                  </div>
                  <span className="text-slate-500 shrink-0 tabular-nums">48h</span>
                </div>
                {/* Bar 2: Parallel 3-Agent */}
                <div className="flex items-center gap-2">
                  <span className="w-9 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">Triad</span>
                  <div className="flex-1 h-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full w-[12%] shadow-xs"></div>
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0 tabular-nums">1.8s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Micro-Telemetry Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Concurrent Audit</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">96% Faster</span>
          </div>
        </div>

        {/* CARD 3: Isolation - 100% */}
        <div 
          onMouseEnter={() => setHoveredIndex(3)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-linear-to-b from-white via-white to-slate-50/60 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950 p-4 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 flex flex-col justify-between group"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-blue-500/80 via-cyan-400/80 to-transparent" />
          
          <div>
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Isolation
              </span>
              <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60">
                <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              </div>
            </div>

            {/* Metric & Subtitle */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
                100%
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono">
                HMAC-Lock
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              Zero Tenant Leaks
            </p>

            {/* Coolify Tenant Matrix Visualizer (10 Node Dot Grid) */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="h-10 w-full flex items-center justify-between px-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1" title={`Tenant Node 0${i + 1}: STRICT ISOLATION`}>
                    <div className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400 shadow-xs shadow-blue-500/50"></div>
                    <div className="h-3 w-0.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <span className="text-xs font-mono text-slate-400">T{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Micro-Telemetry Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>14,200 PRs Audited</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">0 Leaks</span>
          </div>
        </div>

        {/* CARD 4: CI/CD SLA - < 45s */}
        <div 
          onMouseEnter={() => setHoveredIndex(4)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-linear-to-b from-white via-white to-slate-50/60 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950 p-4 shadow-xs hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-200 flex flex-col justify-between group"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-amber-500/80 via-orange-400/80 to-transparent" />
          
          <div>
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                CI/CD SLA
              </span>
              <div className="p-1 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-900/60">
                <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              </div>
            </div>

            {/* Metric & Subtitle */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
                &lt; 45s
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono">
                Avg: 38.4s
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              TeamCity Gates
            </p>

            {/* Coolify Stepped Stage Duration Progress (SVG/CSS) */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>AST: 6s</span>
                  <span>Roslyn: 12s</span>
                  <span>3-Agent: 18s</span>
                </div>
                {/* Segmented Pipeline Bar */}
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex gap-0.5">
                  <div className="h-full bg-indigo-500 w-[15%]" title="AST Schema Check (6s)"></div>
                  <div className="h-full bg-emerald-500 w-[30%]" title="Roslyn Analyzers (12s)"></div>
                  <div className="h-full bg-blue-500 w-[45%]" title="3-Agent Triad Review (18s)"></div>
                  <div className="h-full bg-amber-500 w-[10%]" title="Artifact Signing (4s)"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Micro-Telemetry Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Max Gate SLA: 45s</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">100% Pass</span>
          </div>
        </div>

        {/* CARD 5: Context Cut - 84% */}
        <div 
          onMouseEnter={() => setHoveredIndex(5)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-linear-to-b from-white via-white to-slate-50/60 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950 p-4 shadow-xs hover:shadow-md hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-200 flex flex-col justify-between group"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-violet-500/80 via-fuchsia-400/80 to-transparent" />
          
          <div>
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                Context Cut
              </span>
              <div className="p-1 rounded-md bg-violet-50 dark:bg-violet-950/60 border border-violet-200/60 dark:border-violet-900/60">
                <FileCode className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
              </div>
            </div>

            {/* Metric & Subtitle */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
                84%
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-violet-600 dark:text-violet-400 font-mono">
                -113k Tok
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              Bounded Slicing
            </p>

            {/* Coolify Context Compression Gauge (SVG) */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="h-10 w-full flex flex-col justify-center gap-1.5 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-8 text-slate-500 shrink-0">Dump</span>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 dark:bg-slate-700 w-full"></div>
                  </div>
                  <span className="text-slate-500 tabular-nums shrink-0">128k</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-violet-600 dark:text-violet-400 font-bold shrink-0">Sliced</span>
                  <div className="flex-1 h-2 bg-violet-50 dark:bg-violet-950/60 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-600 dark:bg-violet-500 w-[16%] shadow-xs"></div>
                  </div>
                  <span className="text-violet-600 dark:text-violet-400 font-bold tabular-nums shrink-0">15k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Micro-Telemetry Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Symbol AST Graph</span>
            <span className="text-violet-600 dark:text-violet-400 font-semibold">$0.002 / Run</span>
          </div>
        </div>

        {/* CARD 6: Human Gate - High-Risk */}
        <div 
          onMouseEnter={() => setHoveredIndex(6)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-linear-to-b from-white via-white to-slate-50/60 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950 p-4 shadow-xs hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-200 flex flex-col justify-between group"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-emerald-500/80 via-indigo-400/80 to-transparent" />
          
          <div>
            {/* Header: Title & Icon */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Human Gate
              </span>
              <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900/60">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              </div>
            </div>

            {/* Metric & Subtitle */}
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
                High-Risk
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                92% Auto
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
              Ledger & DDL Only
            </p>

            {/* Coolify Risk Donut / Segment Proportion Bar (SVG) */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">92% Autonomous</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">8% Staff Sign-off</span>
                </div>
                {/* Risk Distribution Bar */}
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[92%]" title="Autonomous Merge: Low/Med Risk"></div>
                  <div className="h-full bg-amber-500 w-[8%]" title="Human Sign-off: Financial Ledger / DDL"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Micro-Telemetry Footer */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Staff Architect Guard</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Blast Shield</span>
          </div>
        </div>

      </div>
    </section>
  );
}
