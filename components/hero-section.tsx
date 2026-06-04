"use client"

import Link from "next/link"
import { ArrowRight, Check, Download, CircleCheck } from "lucide-react"

const trustBadges = [
  "Kein Demo-Call nötig",
  "Upload in wenigen Minuten",
  "Datenbasierte Voranalyse",
  "Keine Rückerstattungsgarantie",
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-16"
      style={{ backgroundColor: "#0a1526" }}
    >
      {/* Neon grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(29,122,252,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(29,122,252,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(29,122,252,0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1d7afc]/30 bg-[#1d7afc]/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1d7afc]" />
              <span className="text-sm font-medium text-[#5ba3ff]">Self-Serve Leak-Analyse</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Versteckte Zoll-Über&shy;zahlungen in Ihren Importdaten finden.
            </h1>

            <p className="text-lg leading-relaxed text-slate-400">
              Starten Sie ohne Sales-Call: Laden Sie ausgewählte Importdokumente hoch und erhalten
              Sie eine erste datenbasierte Potenzialeinschätzung.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#scan"
                className="inline-flex items-center rounded-lg bg-[#1d7afc] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1d7afc]/25 transition-opacity hover:opacity-90"
              >
                Kostenlosen Leak-Scan starten
              </Link>
              <Link
                href="/ablauf-kosten"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12"
              >
                So funktioniert der Upload
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {trustBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Check className="h-3.5 w-3.5 text-[#1d7afc]" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right – 3-step widget */}
          <div className="flex items-center justify-center lg:justify-end">
            <div
              className="w-full max-w-sm rounded-2xl border border-white/10 p-6 shadow-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
            >
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1d7afc]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Kostenlosen Scan starten
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  {
                    label: "Schritt 1",
                    desc: "Kurzformular ausfüllen",
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="#5ba3ff" strokeWidth="1.5" />
                        <line x1="4" y1="5.5" x2="10" y2="5.5" stroke="#5ba3ff" strokeWidth="1.2" strokeLinecap="round" />
                        <line x1="4" y1="8" x2="8" y2="8" stroke="#5ba3ff" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    label: "Schritt 2",
                    desc: "3–10 Test-Dokumente hochladen",
                    icon: <Download className="h-3.5 w-3.5 text-[#5ba3ff]" />,
                  },
                  {
                    label: "Schritt 3",
                    desc: "Potenzialeinschätzung erhalten",
                    icon: <CircleCheck className="h-3.5 w-3.5 text-[#5ba3ff]" />,
                  },
                ].map((step) => (
                  <div
                    key={step.label}
                    className="flex items-center gap-4 rounded-xl border border-white/8 px-4 py-3.5"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1d7afc]/40 bg-[#1d7afc]/10">
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400">{step.label}</p>
                      <p className="text-sm font-medium text-white">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                <span className="text-xs text-slate-500">Gesamtdauer:</span>
                <span className="text-sm font-semibold text-white">ca. 5–10 Minuten</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
