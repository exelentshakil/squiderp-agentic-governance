#!/usr/bin/env python3
"""
Production Scope & Formal Estimate Generator
SquidERP Principal AI-Native Software Engineering & Governance Architect
Client: Mendel, SquidERP (Brooklyn, NY, USA)
Built to exact BarakahSoft Gold-Standard Architecture:
- 6 Direct Flex Children (Zero Middle Void)
- High-Density 6-Row Scope Table with Percentage Allocations
- Verified Upwork Partner Credentials (Never "Top Rated")
- Dual Signature Block with Formal Authorization
- Inlined Base64 Assets and Headless Chrome Single-Page PDF Audit
"""

import os
import re
import base64
import subprocess
import sys

def build_estimate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.abspath(os.path.join(current_dir, ".."))
    docs_dir = os.path.join(project_dir, "docs")
    html_path = os.path.join(docs_dir, "estimate.html")
    pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

    headshot_file = os.path.join(docs_dir, "headshot.jpeg")
    logo_file = os.path.join(docs_dir, "logo.png")

    with open(headshot_file, "rb") as f:
        headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

    with open(logo_file, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope &amp; Formal Estimate - SquidERP AI-Native Governance</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      font-size: 9.4px;
    }}

    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      gap: 6px;
    }}

    /* 1. Executive Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #0f2942;
      padding-bottom: 6px;
    }}
    .header-left {{
      flex: 1;
      min-width: 0;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #4f46e5;
      margin-bottom: 2px;
      white-space: nowrap;
    }}
    h1 {{
      font-size: 13.8px;
      font-weight: 800;
      color: #0f2942;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .subtitle {{
      font-size: 8.6px;
      color: #475569;
      margin: 0;
      line-height: 1.25;
      white-space: nowrap;
    }}
    .meta-card {{
      flex-shrink: 0;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 5px 10px;
      font-size: 8.3px;
      text-align: right;
      line-height: 1.36;
      white-space: nowrap;
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 9999px;
      font-size: 8px;
      text-transform: uppercase;
      margin-left: 3px;
    }}

    /* 2. Scope & Milestones Table */
    .scope-block {{
      margin-top: 0;
    }}
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.5px;
    }}
    .section-title {{
      font-size: 9.6px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f2942;
      border-left: 3px solid #4f46e5;
      padding-left: 6px;
      margin: 0;
    }}
    .section-meta {{
      font-size: 8.2px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
    }}
    th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8.2px;
      letter-spacing: 0.04em;
      border: 1px solid #cbd5e1;
      padding: 3.8px 6px;
      text-align: left;
    }}
    td {{
      border: 1px solid #e2e8f0;
      padding: 3.8px 6px;
      font-size: 8.5px;
      vertical-align: top;
    }}
    .phase-num {{
      font-weight: 800;
      color: #1e293b;
      font-size: 8.5px;
      white-space: nowrap;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      font-size: 8.8px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.9px;
      margin-top: 1px;
      line-height: 1.22;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      color: #15803d;
      font-weight: 800;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      border: 1px solid #0f172a;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      padding: 4.2px 6px;
      font-size: 8.8px;
    }}

    /* 3. 2-Column Technical & Financial Breakdown */
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5px 9px;
    }}
    .card-box-title {{
      font-size: 8.4px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f2942;
      margin: 0 0 3px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 1px dotted #cbd5e1;
      padding: 2px 0;
      font-size: 7.8px;
    }}
    .milestone-item:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .milestone-name {{
      color: #334155;
    }}
    .milestone-val {{
      font-weight: 800;
      color: #0f172a;
      font-family: ui-monospace, monospace;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 7.8px;
      color: #334155;
      margin-bottom: 2px;
      padding-left: 10px;
      position: relative;
      line-height: 1.22;
    }}
    .guardrail-item:last-child {{
      margin-bottom: 0;
    }}
    .guardrail-item::before {{
      content: "✓";
      position: absolute;
      left: 0;
      color: #16a34a;
      font-weight: 800;
      font-size: 7.5px;
    }}

    /* 4. Commercial Terms Section */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 5px 9px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }}
    .term-col {{
      font-size: 7.8px;
      line-height: 1.22;
    }}
    .term-title {{
      font-weight: 800;
      color: #4f46e5;
      text-transform: uppercase;
      font-size: 7.7px;
      margin-bottom: 1px;
    }}
    .term-body {{
      color: #475569;
    }}

    /* 5. Formal Acceptance Authorization Block */
    .auth-block {{
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #f8fafc;
      padding: 6px 11px;
    }}
    .auth-title {{
      font-size: 8.4px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 7.9px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      font-size: 7.8px;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-top: 3px;
    }}
    .auth-sign-field {{
      flex: 1;
      border-bottom: 1.2px solid #475569;
      min-height: 22px;
      display: flex;
      align-items: flex-end;
      font-family: "Brush Script MT", "Caveat", cursive, sans-serif;
      font-size: 14px;
      color: #0f2942;
      padding-left: 4px;
      padding-bottom: 1px;
    }}
    .auth-date-field {{
      width: 90px;
      border-bottom: 1.2px solid #475569;
      min-height: 22px;
      font-family: ui-monospace, monospace;
      font-size: 8px;
      color: #334155;
      text-align: center;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1px;
      white-space: nowrap;
    }}
    .auth-label {{
      font-size: 7px;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 1.5px;
    }}

    /* 6. Executive Signature Footer */
    .footer-container {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      padding: 5px 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 9px;
      flex: 1;
      min-width: 0;
    }}
    .founder-avatar {{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #0f2942;
      flex-shrink: 0;
    }}
    .founder-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }}
    .founder-name {{
      font-size: 8.8px;
      color: #0f172a;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-name strong {{
      color: #0f172a;
      font-weight: 800;
    }}
    .founder-company {{
      font-size: 8px;
      color: #334155;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .founder-company strong {{
      color: #1e293b;
      font-weight: 700;
    }}
    .founder-sub {{
      font-size: 7.5px;
      color: #475569;
      line-height: 1.18;
      white-space: nowrap;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2.5px;
      flex-shrink: 0;
    }}
    .business-logo {{
      height: 17px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7.6px;
      color: #4338ca;
      background: #e0e7ff;
      border: 1px solid #c7d2fe;
      padding: 1.5px 6px;
      border-radius: 3px;
      font-weight: 700;
      font-family: ui-monospace, monospace;
      text-decoration: none;
      white-space: nowrap;
    }}
  </style>
</head>
<body>
<div class="page-container">

  <!-- 1. Executive Header -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Enterprise Architecture • Ref #BS-2026-SQUID-ERP</div>
      <h1>SquidERP Principal AI-Native Software Engineering &amp; Governance Architect</h1>
      <p class="subtitle">Deterministic Roslyn Drift Firewalls • SQL Multi-Tenant Isolation • 3-Tier Multi-Agent Review • Legacy Modernization</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Mendel, SquidERP (Brooklyn, NY, USA)</div>
      <div><strong>Engagement:</strong> Principal Systems Architect (~25–30 hrs/wk)</div>
      <div><strong>Calibrated Rate:</strong> <strong>$47.00/hr USD (Top of Posted Range)</strong></div>
      <div><strong>Live Cockpit:</strong> <span class="live-badge">Verified &amp; Operational</span></div>
    </div>
  </div>

  <!-- 2. Scope Table -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Production Scope &amp; Operating Milestone Delivery Schedule</h2>
      <div class="section-meta">Live Cockpit: https://squiderp-agentic-governance.vercel.app</div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 11%;">Milestone</th>
          <th style="width: 59%;">Enterprise Architectural Deliverables &amp; Engineering Guardrails</th>
          <th style="width: 10%; text-align: center;">Timeline</th>
          <th style="width: 8%; text-align: center;">Hours</th>
          <th style="width: 12%; text-align: right;">Investment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num"><span class="phase-0-badge">Phase 0</span></td>
          <td>
            <div class="phase-name">Interactive Governance Control Plane &amp; Prototype (Deployed &amp; Live)</div>
            <div class="phase-desc">Complete live cockpit: 4-scenario architectural drift simulator, real dual-provider AI code auditor (OpenAI + Gemini), 10 RFP architectural tenets matrix, chaos disaster recovery test, and turnkey blueprints. Built ahead of engagement.</div>
          </td>
          <td style="text-align: center; font-weight: 700; white-space: nowrap;">Live Now</td>
          <td style="text-align: center; color: #16a34a; font-weight: 700;">Included</td>
          <td style="text-align: right; font-weight: 800; color: #16a34a;">$0.00 (Live)</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 1</td>
          <td>
            <div class="phase-name">Engineering &amp; AI-Development Diagnostic Audit &amp; Risk Baseline</div>
            <div class="phase-desc">Deep-dive assessment of SquidERP's .NET Core, SQL Server, WPF, and Angular codebases. Audit current developer workflows (Claude Code, Codex, Cursor), identify architectural drift hotspots, and deliver the Target AI-Native Operating Model.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">Weeks 1–2</td>
          <td style="text-align: center; font-weight: 700; color: #4f46e5;">50 hrs</td>
          <td style="text-align: right; font-weight: 700;">$2,350.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 2</td>
          <td>
            <div class="phase-name">Repository Rules, Skills &amp; Bounded Context Engine Implementation</div>
            <div class="phase-desc">Deploy repository-level <code>.claude/rules/</code> across all key ERP modules. Create domain-specific Bounded Context Packs (Accounting, Inventory, Sync, Reporting), custom MCP schema servers, and Gherkin-based specification intake contracts.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">Weeks 3–5</td>
          <td style="text-align: center; font-weight: 700; color: #4f46e5;">75 hrs</td>
          <td style="text-align: right; font-weight: 700;">$3,525.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 3</td>
          <td>
            <div class="phase-name">TeamCity CI/CD Quality Gates &amp; Roslyn Drift Firewall Deployment</div>
            <div class="phase-desc">Build custom C# Roslyn analyzers (<code>ERP-ARCH-001</code>) blocking direct GeneralLedger writes. Deploy SQL Server migration linters (<code>SQL-SEC-014</code>) enforcing @TenantId, and automated 3-agent adversarial review pipeline into TeamCity CI.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">Weeks 6–9</td>
          <td style="text-align: center; font-weight: 700; color: #4f46e5;">100 hrs</td>
          <td style="text-align: right; font-weight: 700;">$4,700.00</td>
        </tr>
        <tr>
          <td class="phase-num">Phase 4</td>
          <td>
            <div class="phase-name">Legacy Modernization Playbook, Golden Master Tests &amp; Team Enablement</div>
            <div class="phase-desc">Execute Strangler Fig modernization workflows for legacy stored procedures and WPF sync daemons with automated Golden Master regression suites. Conduct developer enablement workshops and transition to ongoing architectural advisory.</div>
          </td>
          <td style="text-align: center; font-weight: 600;">Weeks 10–12</td>
          <td style="text-align: center; font-weight: 700; color: #4f46e5;">75 hrs</td>
          <td style="text-align: right; font-weight: 700;">$3,525.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Total Turnkey Architectural Rollout Scope (300 Hours @ $47.00/hr)</td>
          <td style="text-align: center; font-weight: 800;">12 Weeks</td>
          <td style="text-align: center; font-weight: 800;">300 hrs</td>
          <td style="text-align: right; font-weight: 800; font-family: ui-monospace, monospace; font-size: 10px;">$14,100.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Technical & Financial Breakdown -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">Operating Engagement &amp; Sprint Structure</div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 0: Interactive Control Plane (Delivered)</span>
        <span class="milestone-val" style="color: #16a34a;">$0.00 (Live Ahead of Bid)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 1: Codebase Diagnostic &amp; Drift Audit (50 hrs)</span>
        <span class="milestone-val">$2,350.00 (Weeks 1–2)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 2: Rules, MCP &amp; Context Engine (75 hrs)</span>
        <span class="milestone-val">$3,525.00 (Weeks 3–5)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 3: Roslyn Firewall &amp; TeamCity CI (100 hrs)</span>
        <span class="milestone-val">$4,700.00 (Weeks 6–9)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 4: Strangler Modernization &amp; Training (75 hrs)</span>
        <span class="milestone-val">$3,525.00 (Weeks 10–12)</span>
      </div>
    </div>

    <div class="card-box">
      <div class="card-box-title">Deterministic Architecture Guardrails</div>
      <div class="guardrail-item"><strong>Roslyn Compiler-Level Defense:</strong> C# analyzers throw compilation errors if ledger transactions bypass scopes</div>
      <div class="guardrail-item"><strong>SQL Multi-Tenant Partitioning:</strong> Automated AST migration linter verifies mandatory @TenantId indexing</div>
      <div class="guardrail-item"><strong>3-Tier Review Triad:</strong> Concurrency Hunter + Boundary Auditor + Ledger Guardian subagent consensus</div>
      <div class="guardrail-item"><strong>Human-in-the-Loop Safeguards:</strong> High-blast-radius financial mutations strictly escalate to Staff Architects</div>
      <div class="guardrail-item"><strong>Strangler Fig Characterization:</strong> Automated Golden Master suites eliminate legacy refactor regressions</div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Transparent Hourly Billing</div>
        <div class="term-body">$47.00/hr strictly logged via Upwork TeamCity/Git tracked hours (~25–30 hrs/wk). Zero billing surprises or markups.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Deterministic Gates</div>
        <div class="term-body">Architecture rules are enforced at compiler and CI build levels, ensuring rogue AI agents cannot commit bad code.</div>
      </div>
      <div class="term-col">
        <div class="term-title">100% IP &amp; Code Ownership</div>
        <div class="term-body">All Roslyn analyzers, Kotlin CI pipelines, Claude rules, and documentation belong 100% to SquidERP.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Contract-to-Hire Flexibility</div>
        <div class="term-body">Seamless transition from initial architecture rollout into ongoing long-term advisory or Principal Architect role.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization &amp; Engagement Acceptance</span>
      <span style="font-weight: 500; font-size: 7.4px; color: #475569;">Binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Architect: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Shakil Ahmed</strong> • Principal AI-Native Systems Architect &amp; Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">15 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Architect Signature</span>
          <span class="auth-label" style="width: 90px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: SquidERP Inc. (Brooklyn, NY, USA)</div>
        <div>Signatory: <strong>Mendel</strong> • Authorized Client Representative</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 8px; font-style: italic;">[ Accepted via Upwork Contract Offer / Sign-off ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 90px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Principal Systems Architect &amp; Founder (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise Systems Engineering &amp; AI Governance</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Upwork Verified Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://squiderp-agentic-governance.vercel.app" target="_blank" class="demo-badge">squiderp-agentic-governance.vercel.app</a>
    </div>
  </div>
</div>
</body>
</html>
"""

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print("Saved estimate.html to:", html_path)

    # Compile with Headless Chrome using absolute file URI
    chrome_cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        f"file://{os.path.abspath(html_path)}"
    ]

    res = subprocess.run(chrome_cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
        print("File size:", os.path.getsize(pdf_path), "bytes")
    else:
        print("Chrome print-to-pdf error:", res.stderr, file=sys.stderr)
        sys.exit(1)

    # Verify page count
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
    print(f"Verified PDF page count: {len(pages)} page(s)")
    if len(pages) != 1:
        print(f"CRITICAL ERROR: Expected exactly 1 page, got {len(pages)}!", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    build_estimate()
