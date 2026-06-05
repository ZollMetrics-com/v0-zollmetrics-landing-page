import Link from "next/link"
import { ArrowRight, Check, Download, CircleCheck, Shield, MapPin, Lock, Search, FileSearch, Users, TrendingUp } from "lucide-react"

const trustBadges = [
  "Kein Demo-Call nötig",
  "Upload in wenigen Minuten",
  "Datenbasierte Voranalyse",
  "Keine Rückerstattungsgarantie",
]

const complianceBar = [
  { icon: Shield, label: "100% DSGVO-konform" },
  { icon: MapPin, label: "Serverstandort Deutschland (ISO 27001)" },
  { icon: Lock, label: "Verschlüsselung nach Bankenstandard" },
  { icon: Search, label: "Auftragsverarbeitungsvertrag (AVV) vorab verfügbar" },
]

export function HeroSection() {
  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="border-b pt-16"
        style={{ backgroundColor: "#F8F9FA", borderBottomColor: "#e2e8f0" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Left */}
            <div className="flex flex-col gap-6">
              <div
                className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
                style={{ borderColor: "#c3d4f0", backgroundColor: "#eef3fc", color: "#1E3A8A" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#1E3A8A" }} />
                Kostenlose Potenzialanalyse
              </div>

              <h1
                className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]"
                style={{ color: "#0B192C" }}
              >
                Versteckte Zoll-Über&shy;zahlungen in Ihren Importdaten finden.
              </h1>

              <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
                Starten Sie ohne Sales-Call: Laden Sie ausgewählte Importdokumente hoch und erhalten
                Sie eine erste datenbasierte Potenzialeinschätzung.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#scan"
                  className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1E3A8A" }}
                >
                  Kostenlose Potenzialanalyse starten
                </Link>
                <Link
                  href="/ablauf-kosten"
                  className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors hover:bg-slate-100"
                  style={{ borderColor: "#cbd5e1", color: "#0B192C", backgroundColor: "#ffffff" }}
                >
                  So funktioniert der Upload
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {trustBadges.map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-sm" style={{ color: "#64748b" }}>
                    <Check className="h-3.5 w-3.5" style={{ color: "#1E3A8A" }} />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right – 3-step widget */}
            <div className="flex items-center justify-center lg:justify-end">
              <div
                className="w-full max-w-sm rounded-2xl border p-7 shadow-lg"
                style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
              >
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#1E3A8A" }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                    Zoll-Audit starten
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {[
                    {
                      label: "Schritt 1",
                      desc: "Kurzformular ausfüllen",
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="#1E3A8A" strokeWidth="1.5" />
                          <line x1="4" y1="5.5" x2="10" y2="5.5" stroke="#1E3A8A" strokeWidth="1.2" strokeLinecap="round" />
                          <line x1="4" y1="8" x2="8" y2="8" stroke="#1E3A8A" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      ),
                    },
                    { label: "Schritt 2", desc: "3–10 Test-Dokumente hochladen", icon: <Download className="h-3.5 w-3.5" style={{ color: "#1E3A8A" }} /> },
                    { label: "Schritt 3", desc: "Potenzialeinschätzung erhalten", icon: <CircleCheck className="h-3.5 w-3.5" style={{ color: "#1E3A8A" }} /> },
                  ].map((step) => (
                    <div
                      key={step.label}
                      className="flex items-center gap-4 rounded-xl border px-4 py-3.5"
                      style={{ backgroundColor: "#F8F9FA", borderColor: "#e2e8f0" }}
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                        style={{ borderColor: "#c3d4f0", backgroundColor: "#eef3fc" }}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>{step.label}</p>
                        <p className="text-sm font-medium" style={{ color: "#0B192C" }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: "#f1f5f9" }}>
                  <span className="text-xs" style={{ color: "#94a3b8" }}>Gesamtdauer:</span>
                  <span className="text-sm font-semibold" style={{ color: "#0B192C" }}>ca. 5–10 Minuten</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Trust & Compliance Bar */}
      <section className="border-b" style={{ backgroundColor: "#ffffff", borderBottomColor: "#e2e8f0" }}>
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 md:justify-between">
            {complianceBar.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#eef3fc" }}
                >
                  <item.icon className="h-4 w-4" style={{ color: "#1E3A8A" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "#334155" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human + Tech Section */}
      <section className="border-b py-16 md:py-24" style={{ backgroundColor: "#F8F9FA", borderBottomColor: "#e2e8f0" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>
              Mensch + Technologie
            </p>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: "#0B192C" }}>
              Proprietäre Daten-Engine trifft auf menschliche Zoll-Expertise
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
              Unsere hochentwickelte Analyse-Software scannt Ihre Importdaten in wenigen Sekunden auf
              strukturelle Abweichungen und Unstimmigkeiten. Um Fehlalarme auszuschließen, wird jedes
              identifizierte Potenzial anschließend von unseren erfahrenen deutschen Zollexperten manuell
              verifiziert, bevor Sie Ihre Potenzialeinschätzung erhalten. Maximale Sicherheit, null Risiko.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center gap-4 rounded-xl border p-8 text-center" style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "#eef3fc" }}>
                <FileSearch className="h-6 w-6" style={{ color: "#1E3A8A" }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: "#0B192C" }}>Automatisierte Daten-Analyse</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                Proprietäre Algorithmen scannen Tarifnummern, Zollwerte, Präferenzen und Abrechnungen in Sekunden – über alle Ihre Sendungen hinweg.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-xl border p-8 text-center" style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "#eef3fc" }}>
                <Users className="h-6 w-6" style={{ color: "#1E3A8A" }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: "#0B192C" }}>Manuelle Experten-Verifikation</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                Jede Auffälligkeit wird von erfahrenen deutschen Zollexperten geprüft, falsch-positive Ergebnisse ausgeschlossen und nur belastbare Prüffälle übermittelt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>
              Pilotphase
            </p>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "#0B192C" }}>
              Ergebnisse aus der Praxis (Pilotphase)
            </h2>
          </div>

          <div className="mx-auto max-w-2xl">
            <div
              className="rounded-xl border p-8 shadow-sm"
              style={{ backgroundColor: "#F8F9FA", borderColor: "#e2e8f0" }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "#eef3fc" }}>
                  <TrendingUp className="h-5 w-5" style={{ color: "#1E3A8A" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>Fallstudie</p>
                  <p className="text-sm font-medium" style={{ color: "#0B192C" }}>E-Commerce-Importeur</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-sm font-semibold" style={{ color: "#1E3A8A" }}>Branche:</span>
                  <span className="text-sm" style={{ color: "#475569" }}>Unterhaltungselektronik</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-sm font-semibold" style={{ color: "#1E3A8A" }}>Importvolumen:</span>
                  <span className="text-sm" style={{ color: "#475569" }}>12 Mio. € p.a.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-sm font-semibold" style={{ color: "#1E3A8A" }}>Ergebnis:</span>
                  <span className="text-sm" style={{ color: "#475569" }}>
                    14.200 € Zoll-Überzahlungen durch fehlerhafte Tarifnummern-Konsistenz innerhalb von
                    48 Stunden erfolgreich aufgedeckt und revisionssicher dokumentiert.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
