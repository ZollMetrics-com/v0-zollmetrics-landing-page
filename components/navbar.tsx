"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"

const dropdownMenus = [
  {
    label: "Lösung & Prüfbereiche",
    href: "/loesung",
    items: [
      { href: "/loesung", label: "Was ZollMetrics prüft" },
      { href: "/loesung#pruefbereiche", label: "6 Prüfbereiche im Detail" },
    ],
  },
  {
    label: "Ablauf & Kosten",
    href: "/ablauf-kosten",
    items: [
      { href: "/ablauf-kosten", label: "Prozessübersicht" },
      { href: "/ablauf-kosten#preise", label: "Kostenmodell" },
    ],
  },
  {
    label: "Zielgruppe",
    href: "/zielgruppe",
    items: [
      { href: "/zielgruppe", label: "Für wen ZollMetrics sinnvoll ist" },
      { href: "/zielgruppe#vergleich", label: "Eignungsvergleich" },
    ],
  },
  {
    label: "Sicherheit & FAQ",
    href: "/sicherheit",
    items: [
      { href: "/sicherheit", label: "Datensicherheit & Compliance" },
      { href: "/sicherheit#faq", label: "Häufige Fragen" },
    ],
  },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const openDropdown = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b transition-shadow duration-200 ${scrolled ? "shadow-sm" : ""}`}
      style={{ backgroundColor: "#ffffff", borderBottomColor: "#e5e7eb" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ backgroundColor: "#1a4fa8" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="8" width="3" height="6" rx="0.5" fill="white" />
                <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="white" />
                <rect x="11" y="2" width="3" height="12" rx="0.5" fill="white" />
              </svg>
            </div>
            <span className="text-lg font-bold" style={{ color: "#0B192C" }}>
              Zoll<span style={{ color: "#1a4fa8" }}>Metrics</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {dropdownMenus.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => openDropdown(menu.label)}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={menu.href}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
                  style={{ color: activeDropdown === menu.label ? "#1a4fa8" : "#374151" }}
                >
                  {menu.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-150 ${activeDropdown === menu.label ? "rotate-180" : ""}`}
                  />
                </Link>
                {activeDropdown === menu.label && (
                  <div
                    className="absolute left-0 top-full z-50 mt-1 min-w-[230px] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
                    onMouseEnter={() => openDropdown(menu.label)}
                    onMouseLeave={closeDropdown}
                  >
                    {menu.items.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="ml-3 border-l border-slate-200 pl-4">
              <Link
                href="/datenraum"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              >
                Bestandskunde
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/#scan"
              className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1a4fa8" }}
            >
              Zoll-Audit starten
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="flex flex-col px-4 py-3">
            {dropdownMenus.map((menu) => (
              <div key={menu.label} className="border-b border-slate-100 last:border-0">
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === menu.label ? null : menu.label)}
                  className="flex w-full items-center justify-between py-3 text-sm font-medium text-slate-700"
                >
                  {menu.label}
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${mobileExpanded === menu.label ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === menu.label && (
                  <div className="mb-2 ml-3 flex flex-col gap-1 border-l-2 border-slate-200 pl-3">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 text-sm text-slate-500 hover:text-slate-900"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/datenraum"
              onClick={() => setMobileOpen(false)}
              className="border-t border-slate-100 py-3 text-sm font-medium text-slate-500"
            >
              Bestandskunde
            </Link>
            <Link
              href="/#scan"
              onClick={() => setMobileOpen(false)}
              className="mb-2 mt-3 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: "#1a4fa8" }}
            >
              Zoll-Audit starten
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
