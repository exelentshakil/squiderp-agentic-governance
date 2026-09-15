"use client";

import React from "react";
import { 
  ARCHITECTURAL_TENETS, 
  ArchitecturalTenet 
} from "@/data/governanceData";
import { 
  FileText, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Terminal,
  FolderGit2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ArchitecturalTenetsMatrix() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [expandedId, setExpandedId] = React.useState<number | null>(1);

  const categories = ["All", "Intake & Context", "Governance & Control", "Legacy & Scale", "Evolution"];

  const filteredTenets = selectedCategory === "All"
    ? ARCHITECTURAL_TENETS
    : ARCHITECTURAL_TENETS.filter((t) => t.category === selectedCategory);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full space-y-4">
      {/* Category Filter & Subtitle */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                10 Architectural Tenets for Enterprise AI-Native Development
              </h3>
              <Badge variant="brand" className="text-xs font-mono">
                Mendel's 10 Brief Points
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Rigorous, battle-tested answers detailing how we structure context, prevent drift, enforce determinism, and modernize legacy ERP architectures.
            </p>
          </div>

          {/* Category Filters (Brevity Law: ≤ 16 chars, whitespace-nowrap shrink-0) */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tenets Accordion List */}
        <div className="space-y-2.5">
          {filteredTenets.map((t) => {
            const isExpanded = expandedId === t.id;

            return (
              <div
                key={t.id}
                className={`rounded-xl border transition-all ${
                  isExpanded
                    ? "border-indigo-500 bg-white dark:border-indigo-500/80 dark:bg-slate-850 shadow-sm ring-1 ring-indigo-500/20"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60"
                }`}
              >
                {/* Header Clickable Row */}
                <button
                  onClick={() => toggleExpand(t.id)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                      {t.id < 10 ? `0${t.id}` : t.id}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {t.shortTitle}
                        </h4>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-2xl">
                        {t.question}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0 mt-1 sm:mt-0">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {/* Expanded Body */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
                    {/* Operational Model */}
                    <div>
                      <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                        Operational Engineering Model:
                      </span>
                      <p className="leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                        {t.operationalModel}
                      </p>
                    </div>

                    {/* 2-Column Split: Deterministic vs AI & SquidERP Fit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Deterministic vs AI */}
                      <div className="p-3 rounded-lg bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1">
                          Deterministic vs. AI Division:
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {t.deterministicVsAi}
                        </p>
                      </div>

                      {/* SquidERP Application */}
                      <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
                        <span className="text-xs font-bold font-mono text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block mb-1">
                          SquidERP Architecture Impact:
                        </span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {t.squidErpApplication}
                        </p>
                      </div>
                    </div>

                    {/* Concrete Artifacts */}
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        Enforced Artifacts:
                      </span>
                      {t.concreteArtifacts.map((art, aIdx) => (
                        <span
                          key={aIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        >
                          <FolderGit2 className="h-3 w-3 text-indigo-500" />
                          {art}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
