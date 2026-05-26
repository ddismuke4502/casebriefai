import { Scale, ShieldAlert } from "lucide-react";

const navLinks = [
  {
    label: "Analyzer",
    href: "#analyzer",
  },
  {
    label: "Facts",
    href: "#analysis",
  },
  {
    label: "Timeline",
    href: "#timeline",
  },
  {
    label: "Issues",
    href: "#issues",
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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-case-border bg-case-black/82 px-6 py-4 backdrop-blur-xl md:px-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <a href="#" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-case-border bg-case-gunmetal case-glow">
            <Scale className="size-5 text-case-gold" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-[0.28em] text-case-gold">
              CASEBRIEF AI
            </p>
            <p className="hidden text-xs text-case-muted sm:block">
              Noir Legal Intelligence
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-5 text-sm text-case-muted lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-case-gold"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#disclaimer"
            className="hidden items-center gap-2 rounded-full border border-case-red/40 bg-case-red/10 px-4 py-2 text-sm font-bold text-case-red-soft transition hover:border-case-red-soft sm:inline-flex"
          >
            <ShieldAlert className="size-4" />
            Disclaimer
          </a>

          <a
            href="#analyzer"
            className="signal-button rounded-full px-4 py-2 text-sm font-black"
          >
            Analyze
          </a>
        </div>
      </nav>
    </header>
  );
}