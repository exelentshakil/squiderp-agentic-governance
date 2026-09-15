"use client";

import React from "react";
import { useTheme } from "next-themes";
import { 
  ShieldCheck, 
  Terminal, 
  Sun, 
  Moon, 
  Zap, 
  Download, 
  Calculator, 
  AlertTriangle,
  Layers,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onOpenCommand: () => void;
  onOpenRoi: () => void;
  onOpenChaos: () => void;
  onOpenBlueprints: () => void;
  onSelectTab: (tab: string) => void;
  activeTab: string;
}

export function Header({
  onOpenCommand,
  onOpenRoi,
  onOpenChaos,
  onOpenBlueprints,
  onSelectTab,
  activeTab,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/95 px-0 py-3 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Enterprise Context */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md dark:bg-indigo-600">
              <ShieldCheck className="h-5 w-5 text-indigo-400 dark:text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white truncate">
                  AgenticGate
                </span>
                <Badge variant="outline" className="hidden sm:inline-flex text-xs font-mono border-slate-300 dark:border-slate-700">
                  SquidERP Core
                </Badge>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 whitespace-nowrap shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  42 Rules Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden md:block">
                Enterprise AI-Native Software Engineering & Drift Firewall Control Plane
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Brevity Law: ≤ 16 chars, whitespace-nowrap shrink-0) */}
          <div className="hidden lg:flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800 shrink-0">
            <button
              onClick={() => onSelectTab("simulator")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
                activeTab === "simulator"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              Drift Simulator
            </button>
            <button
              onClick={() => onSelectTab("auditor")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
                activeTab === "auditor"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Zap className="h-3.5 w-3.5 text-indigo-500" />
              Live AI Auditor
            </button>
            <button
              onClick={() => onSelectTab("tenets")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
                activeTab === "tenets"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              10 Tenets
            </button>
            <button
              onClick={() => onSelectTab("roadmap")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
                activeTab === "roadmap"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              Operating Model
            </button>
          </div>

          {/* Action Cluster (Brevity Law: ≤ 14 chars, whitespace-nowrap shrink-0) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenCommand}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 whitespace-nowrap shrink-0 transition-colors"
              title="Open command palette (⌘K)"
            >
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-500">
                ⌘K
              </kbd>
            </button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenRoi}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0"
            >
              <Calculator className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              ROI Calc
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChaos}
              className="inline-flex items-center gap-1.5 text-xs font-semibold border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:bg-amber-950/40 whitespace-nowrap shrink-0"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              Chaos Test
            </Button>

            <Button
              variant="brand"
              size="sm"
              onClick={onOpenBlueprints}
              className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              Blueprints
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-8 w-8 text-slate-600 dark:text-slate-300 shrink-0"
                aria-label="Toggle color theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
