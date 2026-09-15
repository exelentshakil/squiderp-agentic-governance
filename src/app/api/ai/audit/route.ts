import { NextRequest, NextResponse } from "next/server";
import { auditCodeForArchitectureDrift } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { codeSnippet, technologyStack, auditProfile } = body;

    if (!codeSnippet || typeof codeSnippet !== "string") {
      return NextResponse.json(
        { error: "codeSnippet must be a non-empty string" },
        { status: 400 }
      );
    }

    const result = await auditCodeForArchitectureDrift(
      codeSnippet,
      technologyStack || ".NET / C#",
      auditProfile || "Architectural Boundary"
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI audit endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error running code audit" },
      { status: 500 }
    );
  }
}
