"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ReviewerTour } from "@/components/ReviewerTour";
import { BentoKpis } from "@/components/BentoKpis";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { DriftScenarioSimulator } from "@/components/DriftScenarioSimulator";
import { LiveCodeAuditor } from "@/components/LiveCodeAuditor";
import { AgenticWorkflowsView } from "@/components/AgenticWorkflowsView";
import { ArchitecturalTenetsMatrix } from "@/components/ArchitecturalTenetsMatrix";
import { DiagnosticRoadmapView } from "@/components/DiagnosticRoadmapView";
import { ActivityConsole } from "@/components/ActivityConsole";
import { BlueprintExporter } from "@/components/BlueprintExporter";
import { RoiCalculatorModal } from "@/components/RoiCalculatorModal";
import { ChaosModal } from "@/components/ChaosModal";
import { CommandDialog } from "@/components/CommandDialog";
import { Footer } from "@/components/Footer";
import { 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  Terminal,
  FolderGit2,
  Calculator,
  Flame,
  Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("simulator");
  const [blueprintsOpen, setBlueprintsOpen] = useState<boolean>(false);
  const [roiOpen, setRoiOpen] = useState<boolean>(false);
  const [chaosOpen, setChaosOpen] = useState<boolean>(false);
  const [commandOpen, setCommandOpen] = useState<boolean>(false);

  // Global ⌘K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectTab = (tabId: string, shouldScroll = true) => {
    setActiveTab(tabId);
    if (shouldScroll) {
      setTimeout(() => {
        const el = document.getElementById("interactive-cockpit-view");
        if (el) {
          const headerOffset = 70;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 40);
    }
  };

  const handleCommandSelect = (actionId: string) => {
    if (actionId === "tab-scenarios") handleSelectTab("simulator", true);
    else if (actionId === "tab-auditor") handleSelectTab("auditor", true);
    else if (actionId === "tab-workflows") handleSelectTab("workflows", true);
    else if (actionId === "tab-tenets") handleSelectTab("tenets", true);
    else if (actionId === "tab-roadmap") handleSelectTab("roadmap", true);
    else if (actionId === "modal-blueprints") setBlueprintsOpen(true);
    else if (actionId === "modal-roi") setRoiOpen(true);
    else if (actionId === "modal-chaos") setChaosOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Sticky Header with Cockpit Controls */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => handleSelectTab(tab, true)}
        onOpenBlueprints={() => setBlueprintsOpen(true)}
        onOpenRoi={() => setRoiOpen(true)}
        onOpenChaos={() => setChaosOpen(true)}
        onOpenCommand={() => setCommandOpen(true)}
      />

      {/* Main Responsive Container (Max-W-[1440px], Anti-Wrap, Pixel-Aligned) */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Pinned 30-Second Guided Tour */}
        <ReviewerTour
          activeTab={activeTab} 
          onSelectTab={(tab) => handleSelectTab(tab, true)}
          onOpenBlueprints={() => setBlueprintsOpen(true)}
        />

        {/* Authoritative Bento KPI Matrix */}
        <BentoKpis />

        {/* Interactive 6-Stage AI-Native State Machine Canvas */}
        <WorkflowCanvas />

        {/* View Switcher Bar with Brevity Law Tabs & Scroll Anchor */}
        <div id="interactive-cockpit-view" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 scroll-mt-20">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs overflow-x-auto scrollbar-none">
            <button
              onClick={() => handleSelectTab("simulator", false)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                activeTab === "simulator"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              Drift Simulator
            </button>

            <button
              onClick={() => handleSelectTab("auditor", false)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                activeTab === "auditor"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Live AI Auditor
            </button>

            <button
              onClick={() => handleSelectTab("workflows", false)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                activeTab === "workflows"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Workflow className="h-3.5 w-3.5" />
              Workflows & APIs
            </button>

            <button
              onClick={() => handleSelectTab("tenets", false)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                activeTab === "tenets"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              10 Tenets
            </button>

            <button
              onClick={() => handleSelectTab("roadmap", false)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                activeTab === "roadmap"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              Operating Model
            </button>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBlueprintsOpen(true)}
              className="text-xs h-8 whitespace-nowrap shrink-0"
            >
              <FolderGit2 className="h-3.5 w-3.5 mr-1 text-indigo-500" />
              Blueprints
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRoiOpen(true)}
              className="text-xs h-8 whitespace-nowrap shrink-0"
            >
              <Calculator className="h-3.5 w-3.5 mr-1 text-emerald-500" />
              ROI Calc
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChaosOpen(true)}
              className="text-xs h-8 whitespace-nowrap shrink-0 border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/40"
            >
              <Flame className="h-3.5 w-3.5 mr-1 text-amber-500" />
              Chaos Test
            </Button>
          </div>
        </div>

        {/* Dynamic Main Cockpit View with Smooth Transition */}
        <section className="transition-opacity duration-200">
          {activeTab === "simulator" && <DriftScenarioSimulator />}
          {activeTab === "auditor" && <LiveCodeAuditor />}
          {activeTab === "workflows" && <AgenticWorkflowsView />}
          {activeTab === "tenets" && <ArchitecturalTenetsMatrix />}
          {activeTab === "roadmap" && <DiagnosticRoadmapView />}
        </section>

        {/* Real-time TeamCity CI/CD & Agent Activity Stream Drawer */}
        <section className="pt-2">
          <ActivityConsole />
        </section>
      </main>

      {/* Production Specs & Enterprise Architect Footer */}
      <Footer />

      {/* Operational Modals */}
      <BlueprintExporter
        open={blueprintsOpen}
        onOpenChange={setBlueprintsOpen}
      />
      <RoiCalculatorModal
        open={roiOpen}
        onOpenChange={setRoiOpen}
      />
      <ChaosModal
        open={chaosOpen}
        onOpenChange={setChaosOpen}
      />
      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onSelectAction={handleCommandSelect}
      />
    </div>
  );
}
