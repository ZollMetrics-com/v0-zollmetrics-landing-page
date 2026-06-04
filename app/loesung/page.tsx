import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tag, DollarSign, Globe, Truck, RotateCcw, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Lösung & Prüfbereiche – ZollMetrics",
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

function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="border-b pt-16" style={{ backgroundColor: "#f8fafc", borderBottomColor: "#e2e8f0" }}>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1a4fa8" }}>{eyebrow}</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: "#0B192C" }}>{title}</h1>
        <p className="mx-auto max-w-2xl text-lg" style={{ color: "#475569" }}>{subtitle}</p>
      </div>
    </section>
  )
}

export default function LoesungPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <PageHeader
        eyebrow="Lösung & Prüfbereiche"
        title="Was ZollMetrics prüft"
        subtitle="Sechs systematische Prüfbereiche decken die häufigsten Quellen von Zoll-Überzahlungen ab. Jeder Bereich wird anhand Ihrer tatsächlichen Importdaten analysiert."
      />

      <main className="flex-1">
        <section id="pruefbereiche" className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {checkAreas.map((area, i) => (
                <div
                  key={area.title}
                  className="rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
                  style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "#eef3fc" }}
                    >
                      <area.icon className="h-5 w-5" style={{ color: "#1a4fa8" }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#1a4fa8" }}>0{i + 1}</span>
                  </div>
                  <h3 className="mb-2 font-semibold" style={{ color: "#0B192C" }}>{area.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t py-16" style={{ backgroundColor: "#f8fafc", borderTopColor: "#e2e8f0" }}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl" style={{ color: "#0B192C" }}>
              Bereit für Ihre kostenlose Potenzialanalyse?
            </h2>
            <p className="mb-8" style={{ color: "#64748b" }}>
              Laden Sie 3–10 Beispieldokumente hoch und erhalten Sie eine erste Einschätzung – ohne Sales-Call, ohne Vertrag.
            </p>
            <Link
              href="/#scan"
              className="inline-flex items-center rounded-lg px-6 py-3 font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1a4fa8" }}
            >
              Kostenlose Potenzialanalyse starten
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
