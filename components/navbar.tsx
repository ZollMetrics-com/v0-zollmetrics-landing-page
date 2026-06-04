"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

const dropdownMenus = [
  {
    label: "Lösung",
    items: [
      { href: "#loesung", label: "Was ZollMetrics prüft" },
      { href: "#pruefbereiche", label: "6 Prüfbereiche" },
      { href: "#warum", label: "Warum das wichtig ist" },
    ],
  },
  {
    label: "Ablauf",
    items: [
      { href: "#ablauf", label: "So funktioniert der Upload" },
      { href: "#prozess", label: "Schnell zur Potenzialeinschätzung" },
    ],
  },
  {
    label: "Für wen",
    items: [
      { href: "#fuerwen", label: "Geeignet für" },
      { href: "#fuerwen", label: "Weniger geeignet" },
    ],
  },
  {
    label: "Sicherheit",
    items: [
      { href: "#sicherheit", label: "Sensibler Upload" },
      { href: "#faq", label: "Häufige Fragen" },
    ],
  },
]

function DropdownMenu({ menu, onClose }: { menu: typeof dropdownMenus[0]; onClose: () => void }) {
  return (
    <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-white/10 bg-[#0d1b2e] py-1 shadow-xl shadow-black/40">
      {menu.items.map((item) => (
        <a
          key={item.href + item.label}
          href={item.href}
          onClick={onClose}
          className="block px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/8 hover:text-white"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openDropdown = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/8" style={{ backgroundColor: 'rgba(10,20,38,0.97)', backdropFilter: 'blur(12px)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1d7afc]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="8" width="3" height="6" rx="0.5" fill="white"/>
                <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="white"/>
                <rect x="11" y="2" width="3" height="12" rx="0.5" fill="white"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white">
              Zoll<span className="text-[#1d7afc]">Metrics</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {dropdownMenus.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => openDropdown(menu.label)}
                onMouseLeave={closeDropdown}
              >
                <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/8 hover:text-white">
                  {menu.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${activeDropdown === menu.label ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === menu.label && (
                  <DropdownMenu menu={menu} onClose={() => setActiveDropdown(null)} />
                )}
              </div>
            ))}
            <a
              href="#kontakt"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/8 hover:text-white"
            >
              Kontakt
            </a>
            <div className="ml-2 border-l border-white/15 pl-4">
              <a
                href="/datenraum"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/8 hover:text-white"
              >
                Bestandskunde
              </a>
            </div>
          </div>

          {/* CTA button desktop */}
          <div className="hidden md:block">
            <a
              href="#scan"
              className="inline-flex items-center rounded-lg bg-[#1d7afc] px-4 py-2 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
            >
              Kostenlosen Leak-Scan starten
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-300 transition-colors hover:bg-white/8 hover:text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 md:hidden" style={{ backgroundColor: 'rgb(10,20,38)' }}>
          <div className="flex flex-col px-4 py-3">
            {dropdownMenus.map((menu) => (
              <div key={menu.label}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === menu.label ? null : menu.label)}
                  className="flex w-full items-center justify-between py-3 text-sm font-medium text-slate-300"
                >
                  {menu.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === menu.label ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === menu.label && (
                  <div className="mb-2 ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                    {menu.items.map((item) => (
                      <a
                        key={item.href + item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 text-sm text-slate-400 hover:text-white"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-medium text-slate-300"
            >
              Kontakt
            </a>
            <a
              href="/datenraum"
              onClick={() => setMobileOpen(false)}
              className="border-t border-white/10 py-3 text-sm font-medium text-slate-400"
            >
              Bestandskunde
            </a>
            <a
              href="#scan"
              onClick={() => setMobileOpen(false)}
              className="mt-3 mb-2 inline-flex w-full items-center justify-center rounded-lg bg-[#1d7afc] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Kostenlosen Leak-Scan starten
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
