import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SquidERP AI Governance & Agentic Architecture Cockpit",
  description:
    "Enterprise AI-Native Software Engineering & Governance Cockpit for SquidERP. Deterministic Roslyn drift firewalls, SQL multi-tenant guardrails, and 3-tier multi-agent review pipeline.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦑</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>

        {/* Global Analytics Tracking Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var img = new Image();
                  img.src = 'https://demo-traffic.vercel.app/api/pixel?demo=squiderp-agentic-governance&ref=' + encodeURIComponent(document.referrer || 'direct') + '&ts=' + Date.now();
                } catch(e) {}
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
