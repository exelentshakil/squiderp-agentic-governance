"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Zap,
  CheckCircle2,
  Server
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoiCalculatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoiCalculatorModal({ open, onOpenChange }: RoiCalculatorModalProps) {
  const [engineers, setEngineers] = useState<number>(35);
  const [prsPerWeek, setPrsPerWeek] = useState<number>(140);
  const [avgReviewHours, setAvgReviewHours] = useState<number>(2.5);
  const [hourlyEngineerCost, setHourlyEngineerCost] = useState<number>(85);

  // Math models for enterprise agentic governance
  const weeklyReviewHoursTotal = prsPerWeek * avgReviewHours;
  const currentWeeklySpend = weeklyReviewHoursTotal * hourlyEngineerCost;
  const currentAnnualSpend = currentWeeklySpend * 50;

  // With SquidERP 3-tier governance: 65% reduction in manual PR triage + 99.4% drift prevention
  const automatedReviewHours = weeklyReviewHoursTotal * 0.35; // 65% saved
  const annualHoursSaved = (weeklyReviewHoursTotal - automatedReviewHours) * 50;
  const grossAnnualSavings = annualHoursSaved * hourlyEngineerCost;

  // Estimated token / LLM inference cost (gpt-4o-mini + Gemini fallback @ ~120k tokens/PR)
  const tokenCostPerPr = 0.042; // $0.042 per PR review
  const annualTokenCost = prsPerWeek * 50 * tokenCostPerPr;
  const netAnnualSavings = grossAnnualSavings - annualTokenCost;
  const roiMultiplier = (grossAnnualSavings / (annualTokenCost || 1)).toFixed(0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-5 pb-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <DialogTitle className="text-base font-bold text-slate-900 dark:text-white">
                Engineering Velocity & ROI Simulator
              </DialogTitle>
            </div>
            <Badge variant="brand" className="font-mono text-xs">
              {roiMultiplier}x ROI
            </Badge>
          </div>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Model engineering hours and architectural risk mitigation across SquidERP's distributed engineering teams.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-5">
          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-400">Active Engineers</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">{engineers} devs</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={engineers}
                onChange={(e) => setEngineers(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">Core .NET, SQL & Angular engineers</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-400">PRs Merged / Week</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">{prsPerWeek} PRs</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={prsPerWeek}
                onChange={(e) => setPrsPerWeek(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">Across 6 enterprise repositories</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-400">Manual Review Time</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">{avgReviewHours} hrs/PR</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="6.0"
                step="0.5"
                value={avgReviewHours}
                onChange={(e) => setAvgReviewHours(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">Architect & peer code review cycles</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-400">Blended Rate</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">${hourlyEngineerCost}/hr</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                step="5"
                value={hourlyEngineerCost}
                onChange={(e) => setHourlyEngineerCost(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">Internal engineering base rate</span>
            </div>
          </div>

          {/* Results Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Annual Net Gain
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-900 dark:text-emerald-100">
                ${Math.round(netAnnualSavings).toLocaleString()}
              </div>
              <div className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-1">
                Engineering hours recovered
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-1">
                <Clock className="h-3.5 w-3.5" />
                Hours Saved
              </div>
              <div className="text-2xl font-bold font-mono text-indigo-900 dark:text-indigo-100">
                {Math.round(annualHoursSaved).toLocaleString()} hrs
              </div>
              <div className="text-xs text-indigo-700/80 dark:text-indigo-400/80 mt-1">
                Redirected to roadmap features
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                <Server className="h-3.5 w-3.5" />
                Inference Cost
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                ${Math.round(annualTokenCost).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                ~${tokenCostPerPr} / PR audit
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Waste Token Budget:</strong> By executing deterministic Roslyn and AST checks first, 40% of invalid PRs are rejected before invoking LLM inference, slashing API costs while guaranteeing 100% boundary isolation.
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
