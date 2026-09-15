"use client";

import React from "react";
import { 
  ShieldCheck, 
  Terminal, 
  Database, 
  Cpu, 
  GitBranch, 
  Lock, 
  Server,
  Layers,
  Code2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                SquidERP Core
              </span>
              <Badge variant="outline" className="text-xs font-mono">
                v3.4-gov
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Enterprise Agentic Architecture & Governance Cockpit for large-scale .NET, SQL Server, Angular, and WPF distributed ERP platforms.
            </p>
          </div>

          {/* Architecture Pillars */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Deterministic Gates
            </h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 font-mono">
              <li className="flex items-center gap-1.5">
                <Code2 className="h-3 w-3 text-indigo-500" />
                Roslyn ERP-ARCH-001
              </li>
              <li className="flex items-center gap-1.5">
                <Database className="h-3 w-3 text-indigo-500" />
                SQL-SEC-014 Tenant Linter
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-indigo-500" />
                WPF Concurrency Analyzer
              </li>
              <li className="flex items-center gap-1.5">
                <GitBranch className="h-3 w-3 text-indigo-500" />
                Strangler Fig Guardrails
              </li>
            </ul>
          </div>

          {/* AI Orchestration Matrix */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Dual-Provider Engine
            </h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 font-mono">
              <li className="flex items-center gap-1.5">
                <Server className="h-3 w-3 text-emerald-500" />
                Primary: OpenAI gpt-4o-mini
              </li>
              <li className="flex items-center gap-1.5">
                <Server className="h-3 w-3 text-emerald-500" />
                Fallback: Gemini 2.0 Flash
              </li>
              <li className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-indigo-500" />
                Offline: Local AST Engine
              </li>
              <li className="flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-indigo-500" />
                Bounded Context Slicing
              </li>
            </ul>
          </div>

          {/* Lead Architect Credentials */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Architect Specifications
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Authored by <strong>Shakil Ahmed</strong>, Principal AI-Native Systems Architect & Founder (12+ Yrs Exp).
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Former Lead Engineer at Legiit ($1M ARR Command Center scaled across 1,500+ businesses). Specializing in deterministic AI governance, Roslyn analyzers, and high-concurrency ERP modernization.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>SquidERP Enterprise Governance Protocol</span>
            <span>•</span>
            <span>Ready for TeamCity CI & GitHub Enterprise</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All Systems Operational
            </span>
            <span>Zero Unbounded Context Dumps</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
