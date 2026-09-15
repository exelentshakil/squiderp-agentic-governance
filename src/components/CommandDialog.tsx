"use client";

import React, { useEffect, useState } from "react";
import { 
  Search, 
  Terminal, 
  ShieldAlert, 
  Sparkles, 
  FileText, 
  FolderGit2, 
  Calculator, 
  Flame, 
  Moon, 
  Sun,
  Layers,
  ArrowRight
} from "lucide-react";
import { 
  Dialog, 
  DialogContent 
} from "@/components/ui/dialog";

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAction: (action: string) => void;
}

export function CommandDialog({ open, onOpenChange, onSelectAction }: CommandDialogProps) {
  const [search, setSearch] = useState("");

  const actions = [
    {
      id: "tab-scenarios",
      title: "Architectural Drift Scenarios",
      category: "Interactive Simulators",
      icon: ShieldAlert,
      shortcut: "1",
      desc: "Simulate GeneralLedger bypass, SQL tenant leaks, and WPF UI deadlocks.",
    },
    {
      id: "tab-auditor",
      title: "Live Multi-Agent Code Auditor",
      category: "Interactive Simulators",
      icon: Sparkles,
      shortcut: "2",
      desc: "Paste C#, SQL, or TypeScript for instant 3-agent architectural audit.",
    },
    {
      id: "tab-tenets",
      title: "10 Architectural Tenets Matrix",
      category: "Governance Framework",
      icon: Layers,
      shortcut: "3",
      desc: "Mendel's 10 RFP technical questions answered with operating models.",
    },
    {
      id: "tab-roadmap",
      title: "Phase 0-4 Diagnostic Roadmap",
      category: "Governance Framework",
      icon: FileText,
      shortcut: "4",
      desc: "Consulting-to-hire engagement plan for SquidERP codebase audit.",
    },
    {
      id: "modal-blueprints",
      title: "Export Turnkey Blueprints",
      category: "Production Artifacts",
      icon: FolderGit2,
      shortcut: "B",
      desc: "Download Roslyn C# analyzers, .claude/rules, and TeamCity scripts.",
    },
    {
      id: "modal-roi",
      title: "Calculate Engineering ROI",
      category: "Production Artifacts",
      icon: Calculator,
      shortcut: "R",
      desc: "Model hours saved and token costs for a 35-engineer team.",
    },
    {
      id: "modal-chaos",
      title: "Inject Chaos Outage (DR Test)",
      category: "Reliability & DR",
      icon: Flame,
      shortcut: "C",
      desc: "Test automatic OpenAI-to-Gemini failover and offline AST fallback.",
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden shadow-2xl border-slate-200 dark:border-slate-800">
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <Search className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            placeholder="Type a command or search governance cockpit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3.5 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-mono text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
              No matching commands or actions found.
            </div>
          ) : (
            filteredActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    onSelectAction(action.id);
                    onOpenChange(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/50">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {action.title}
                        <span className="text-xs font-normal text-slate-400 uppercase tracking-wider font-mono">
                          {action.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {action.desc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                      {action.shortcut}
                    </kbd>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
