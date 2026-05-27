"use client";

import { useState } from "react";
import { Menu, Scale, ShieldAlert, X } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-case-border bg-case-black/88 px-4 py-4 backdrop-blur-xl md:px-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a
          href="#"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-case-border bg-case-gunmetal case-glow">
            <Scale className="size-5 text-case-gold" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-[0.22em] text-case-gold sm:tracking-[0.28em]">
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

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="#disclaimer"
            className="hidden items-center gap-2 rounded-full border border-case-red/40 bg-case-red/10 px-4 py-2 text-sm font-bold text-case-red-soft transition hover:border-case-red-soft md:inline-flex"
          >
            <ShieldAlert className="size-4" />
            Disclaimer
          </a>

          <LinkButton href="#analyzer" variant="signal" size="sm">
            Analyze
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          className="flex size-11 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal text-case-parchment transition hover:border-case-border-gold hover:text-case-gold lg:hidden"
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={`mx-auto max-w-7xl overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-4 rounded-[1.5rem] border border-case-border bg-case-gunmetal/95 p-4 shadow-2xl">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-2xl border border-case-border bg-black/30 px-4 py-3 text-sm font-bold text-case-muted transition hover:border-case-border-gold hover:text-case-gold"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="case-divider my-4" />

          <div className="grid gap-3 sm:grid-cols-2">
            <LinkButton
              href="#disclaimer"
              onClick={closeMenu}
              variant="redline"
              size="md"
            >
              <ShieldAlert className="size-4" />
              Disclaimer
            </LinkButton>

            <LinkButton
              href="#analyzer"
              onClick={closeMenu}
              variant="signal"
              size="md"
            >
              Analyze File
            </LinkButton>
          </div>
        </div>
      </div>
    </header>
  );
}
