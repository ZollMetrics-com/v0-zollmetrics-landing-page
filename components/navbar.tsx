"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#ansatz", label: "Ansatz" },
  { href: "#prozess", label: "Prozess" },
  { href: "#datenraum", label: "Datenraum" },
  { href: "#kontakt", label: "Kontakt" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 backdrop-blur-sm" style={{ backgroundColor: 'rgba(245,244,242,0.97)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="text-xl font-bold" style={{ color: '#0B1F3A' }}>
            ZollMetrics
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button asChild style={{ backgroundColor: '#0B1F3A' }} className="text-white hover:opacity-90">
              <a href="#kontakt">Kostenlose Erstberatung</a>
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 text-white hover:opacity-90" style={{ backgroundColor: '#0B1F3A' }}>
                <a href="#kontakt" onClick={() => setMobileMenuOpen(false)}>
                  Kostenlose Erstberatung
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
