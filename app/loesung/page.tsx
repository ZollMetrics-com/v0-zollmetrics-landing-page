import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tag, DollarSign, Globe, Truck, RotateCcw, TrendingUp } from "lucide-react"

export const metadata = {
  title: "Was ZollMetrics prüft – Lösung & Prüfbereiche",
  description: "6 systematische Prüfbereiche für Zoll-Überzahlungen in Ihren Importdaten.",
}

const checkAreas = [
  {
    icon: Tag,
    title: "Tarifnummern-Konsistenz",
    desc: "Wir prüfen, ob gleiche oder ähnliche Produkte in verschiedenen Sendungen unter einheitlichen HS-/CN-Codes deklariert wurden. Abweichungen werden dokumentiert und zur Prüfung aufbereitet.",
  },
  {
    icon: DollarSign,
    title: "Zollwertbestandteile",
    desc: "Frachtkosten, Versicherung, Lizenzgebühren und andere Wertbestandteile werden auf Plausibilität und Vollständigkeit geprüft. Auffällige Abweichungen werden gekennzeichnet.",
  },
  {
    icon: Globe,
    title: "Präferenzursprung",
    desc: "Wir analysieren, ob verfügbare Präferenzabkommen und Ursprungsnachweise genutzt wurden. Nicht beanspruchte Präferenzen werden als Prüffall markiert.",
  },
  {
    icon: Truck,
    title: "Spediteurs- und Abgabenabrechnungen",
    desc: "Spediteursrechnungen werden mit den Zollbescheiden und Handelsrechnungen abgeglichen. Diskrepanzen in Abgabenpositionen oder doppelt berechnete Kosten werden identifiziert und dokumentiert.",
  },
  {
    icon: RotateCcw,
    title: "Retouren, Defekte und Re-Exporte",
    desc: "Sendungen mit Rücksendungen, beschädigten Waren oder Re-Exporten werden nach Mustern untersucht. Wir prüfen, ob in diesen Fällen Zölle korrekt zurückgefordert oder verrechnet wurden.",
  },
  {
    icon: TrendingUp,
    title: "Wiederkehrende Importmuster",
    desc: "Über mehrere Sendungen hinweg suchen wir nach Mustern – zum Beispiel immer gleiche Tarifpositionen bei wechselnden Produktbeschreibungen, wiederkehrende Zollwertabweichungen oder systematisch nicht genutzte Präferenzen.",
  },
]

export default function LoesungPage() {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#060e1a" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden pt-16"
        style={{ backgroundColor: "#0a1526" }}
      >
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
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(29,122,252,0.13) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1d7afc]/30 bg-[#1d7afc]/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1d7afc]" />
            <span className="text-sm font-medium text-[#5ba3ff]">Lösung & Prüfbereiche</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Was ZollMetrics prüft
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Sechs systematische Prüfbereiche decken die häufigsten Quellen von Zoll-Überzahlungen ab. Jeder Bereich wird anhand Ihrer tatsächlichen Importdaten analysiert.
          </p>
        </div>
      </section>

      {/* 6 check areas */}
      <main className="flex-1">
        <section id="pruefbereiche" className="py-16 md:py-24" style={{ backgroundColor: "#0d1b2e" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {checkAreas.map((area, i) => (
                <div
                  key={area.title}
                  className="rounded-xl border border-white/10 p-6 transition-colors hover:border-[#1d7afc]/40"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "rgba(29,122,252,0.15)" }}
                    >
                      <area.icon className="h-5 w-5 text-[#1d7afc]" />
                    </div>
                    <span className="text-xs font-semibold text-[#1d7afc]">0{i + 1}</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="border-t border-white/8 py-16" style={{ backgroundColor: "#0a1526" }}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Bereit für Ihren kostenlosen Erstcheck?
            </h2>
            <p className="mb-8 text-slate-400">
              Laden Sie 3–10 Beispieldokumente hoch und erhalten Sie eine erste Einschätzung – ohne Sales-Call, ohne Vertrag.
            </p>
            <a
              href="/#scan"
              className="inline-flex items-center rounded-lg bg-[#1d7afc] px-6 py-3 font-semibold text-white shadow-lg shadow-[#1d7afc]/25 transition-opacity hover:opacity-90"
            >
              Kostenlosen Leak-Scan starten
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
