import { FileText, GitBranch, Scale, ShieldAlert } from "lucide-react";

const footerLinks = [
  {
    label: "Analyzer",
    href: "#analyzer",
  },
  {
    label: "Timeline",
    href: "#timeline",
  },
  {
    label: "Evidence",
    href: "#evidence",
  },
  {
    label: "Export",
    href: "#export",
  },
];

export default function Footer() {
  return (
    <footer
      id="disclaimer"
      className="border-t border-case-border px-6 py-12 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl border border-case-border bg-case-gunmetal">
                <Scale className="size-5 text-case-gold" />
              </div>

              <div>
                <p className="text-sm font-bold tracking-[0.28em] text-case-gold">
                  CASEBRIEF AI
                </p>
                <p className="text-xs text-case-muted">
                  Portfolio legal-tech AI mockup
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xl leading-7 text-case-muted">
              A cinematic legal document analyzer concept demonstrating
              frontend architecture, AI workflow UX, structured data modeling,
              GSAP animation, and safety-conscious product design.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#analyzer"
                className="signal-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black"
              >
                <FileText className="size-4" />
                Try Mock Analyzer
              </a>

              <a
                href="https://github.com/ddismuke4502/casebriefai"
                target="_blank"
                rel="noreferrer"
                className="redline-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
              >
                <GitBranch className="size-4" />
                View Repo
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-case-red/40 bg-case-red/10 p-6">
            <div className="flex gap-4">
              <ShieldAlert className="mt-1 size-6 shrink-0 text-case-red-soft" />

              <div>
                <h2 className="text-2xl font-black">
                  Non-Legal-Advice Disclaimer
                </h2>

                <p className="mt-4 leading-7 text-case-muted">
                  CaseBrief AI is a portfolio mockup created to demonstrate
                  product design, AI-assisted workflow UX, frontend engineering,
                  structured data modeling, and animation. It does not provide
                  legal advice, legal representation, case strategy,
                  attorney-client services, or attorney-reviewed legal work
                  product.
                </p>

                <div className="case-divider my-6" />

                <div className="flex flex-wrap gap-3">
                  {footerLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-case-border bg-black/30 px-4 py-2 text-sm font-bold text-case-muted transition hover:text-case-gold"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-case-border pt-6 text-sm text-case-muted md:flex-row md:items-center">
          <p>© 2026 CaseBrief AI. Portfolio mockup.</p>
          <p>No real documents are processed. No legal advice is provided.</p>
        </div>
      </div>
    </footer>
  );
}