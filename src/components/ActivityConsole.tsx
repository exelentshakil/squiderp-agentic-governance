"use client";

import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  Pause, 
  Play, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  GitPullRequest,
  Server,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TelemetryEvent {
  id: string;
  time: string;
  repo: string;
  prNumber: number;
  author: string;
  eventType: string;
  verdict: "BLOCKED" | "PASSED" | "WARNED" | "AUDITING";
  gate: string;
  latencyMs: number;
}

const INITIAL_EVENTS: TelemetryEvent[] = [
  {
    id: "evt-01",
    time: "14:22:08",
    repo: "SquidErp.Accounting",
    prNumber: 1482,
    author: "agent:claude-3-7-sonnet",
    eventType: "Direct GeneralLedger mutation bypass",
    verdict: "BLOCKED",
    gate: "Roslyn ERP-ARCH-001",
    latencyMs: 38,
  },
  {
    id: "evt-02",
    time: "14:21:45",
    repo: "SquidErp.Database.Migrations",
    prNumber: 893,
    author: "dev:d.vance",
    eventType: "Added CustomerAddresses view with @TenantId predicate",
    verdict: "PASSED",
    gate: "SQL-SEC-014 Linter",
    latencyMs: 14,
  },
  {
    id: "evt-03",
    time: "14:20:12",
    repo: "SquidErp.WpfDesktop",
    prNumber: 421,
    author: "agent:codex-csharp",
    eventType: "Synchronous .Result call on Dispatcher thread",
    verdict: "WARNED",
    gate: "Concurrency Auditor",
    latencyMs: 245,
  },
  {
    id: "evt-04",
    time: "14:18:59",
    repo: "SquidErp.Core",
    prNumber: 2109,
    author: "dev:m.gold",
    eventType: "Clean Architecture Strangler refactor for InvoiceService",
    verdict: "PASSED",
    gate: "Golden Master Suite",
    latencyMs: 820,
  },
];

export function ActivityConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_EVENTS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "BLOCKED" | "PASSED">("ALL");

  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const mockPool: TelemetryEvent[] = [
        {
          id: `evt-${Date.now()}`,
          time: new Date().toLocaleTimeString(),
          repo: "SquidErp.Accounting",
          prNumber: Math.floor(Math.random() * 500) + 1400,
          author: "agent:copilot-workspace",
          eventType: "Unbounded transaction scope on BankReconciliation",
          verdict: "BLOCKED",
          gate: "Ledger Guardian",
          latencyMs: Math.floor(Math.random() * 120) + 20,
        },
        {
          id: `evt-${Date.now() + 1}`,
          time: new Date().toLocaleTimeString(),
          repo: "SquidErp.Core",
          prNumber: Math.floor(Math.random() * 500) + 2000,
          author: "dev:s.ahmed",
          eventType: "Bounded context migration: Payments domain boundary",
          verdict: "PASSED",
          gate: "Domain Boundary Gate",
          latencyMs: Math.floor(Math.random() * 90) + 15,
        },
      ];

      const newEvt = mockPool[Math.floor(Math.random() * mockPool.length)];
      setEvents((prev) => [newEvt, ...prev.slice(0, 19)]);
    }, 12000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const filteredEvents = events.filter((e) => {
    if (filter === "ALL") return true;
    return e.verdict === filter;
  });

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Header / Trigger */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Live TeamCity CI/CD & Agent Telemetry Stream
            </span>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex text-xs font-mono">
            {events.length} Events Active
          </Badge>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
            {(["ALL", "BLOCKED", "PASSED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-0.5 text-xs font-bold rounded font-mono transition-colors whitespace-nowrap shrink-0 ${
                  filter === f
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsStreaming(!isStreaming)}
            className="h-7 w-7 p-0 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            title={isStreaming ? "Pause Stream" : "Resume Stream"}
          >
            {isStreaming ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEvents([])}
            className="h-7 w-7 p-0 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            title="Clear Console"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Console Window */}
      {isOpen && (
        <div className="p-3 bg-slate-950 text-slate-200 font-mono text-xs max-h-72 overflow-y-auto divide-y divide-slate-900">
          {filteredEvents.length === 0 ? (
            <div className="py-8 text-center text-slate-600 italic">
              No telemetry events recorded for current filter.
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <div key={evt.id} className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-900/50 px-2 rounded transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-500 text-xs shrink-0">{evt.time}</span>
                  <span className="text-indigo-400 font-semibold text-xs shrink-0">{evt.repo}#{evt.prNumber}</span>
                  <span className="text-slate-300 text-xs truncate max-w-md">{evt.eventType}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500">{evt.author}</span>
                  <span className="text-xs text-slate-400 font-mono">[{evt.gate}]</span>
                  <span className="text-xs text-slate-500 font-mono">{evt.latencyMs}ms</span>
                  <span
                    className={`px-1.5 py-0.5 text-xs font-bold rounded uppercase ${
                      evt.verdict === "BLOCKED"
                        ? "bg-crimson-950/80 text-crimson-400 border border-crimson-800/50"
                        : evt.verdict === "WARNED"
                        ? "bg-amber-950/80 text-amber-400 border border-amber-800/50"
                        : "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50"
                    }`}
                  >
                    {evt.verdict}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
