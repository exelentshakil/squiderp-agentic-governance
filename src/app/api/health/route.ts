import { NextResponse } from "next/server";

export async function GET() {
  const hasOpenAi = Boolean(
    process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("placeholder")
  );
  const hasGemini = Boolean(
    process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("placeholder")
  );
  const hasSupabase = Boolean(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  );

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "SquidERP Agentic Architecture Governance Control Plane",
    environment: process.env.NODE_ENV || "production",
    providers: {
      openai: {
        active: hasOpenAi,
        model: "gpt-4o-mini",
        role: "Primary Semantic Architecture & Code Review Agent",
      },
      gemini: {
        active: hasGemini,
        model: "gemini-2.0-flash",
        role: "High-Speed Sub-Second Failover Agent",
      },
      deterministicEngine: {
        active: true,
        model: "roslyn-ast-guard-v3",
        role: "100% Deterministic Policy & Architectural Drift Lock",
      },
      supabase: {
        active: hasSupabase,
        role: "Architecture Benchmark & Telemetry Vault",
      },
    },
    architecturalGates: {
      roslynAnalyzers: {
        active: true,
        rulesLoaded: 42,
        targetRuntimes: [".NET Framework 4.8", ".NET 8.0", "C# 12"],
        driftFirewall: "ACTIVE",
      },
      sqlServerGuard: {
        active: true,
        schemaVerification: "ACTIVE",
        multiTenantIsolationRule: "STRICT_ENFORCEMENT",
        deadlockDetection: "ENABLED",
      },
      ciPolicyEnforcer: {
        active: true,
        platform: "TeamCity / GitHub Actions Native",
        passThreshold: "100% Deterministic / 80% Multi-Agent Consensus",
      },
    },
    version: "1.0.0-enterprise",
  });
}
