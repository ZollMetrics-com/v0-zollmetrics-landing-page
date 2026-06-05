import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Check } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Ablauf & Kosten – ZollMetrics",
  description: "Prozessübersicht und Kostenmodell für die ZollMetrics Potenzialanalyse.",
}

const timelineSteps = [
  {
    step: "01",
    title: "Test-Set hochladen",
    desc: "Sie laden 3–10 ausgewählte Importdokumente hoch – Zollbescheide, Handelsrechnungen oder Packlisten. Kein vollständiges Archiv notwendig.",
  },
  {
    step: "02",
    title: "Auffälligkeiten prüfen",
    desc: "Wir analysieren Ihre Dokumente auf strukturelle Auffälligkeiten: inkonsistente Tarifnummern, fehlende Präferenzangaben, Abweichungen in Zollwertbestandteilen.",
  },
  {
    step: "03",
    title: "Potenzialeinschätzung erhalten",
    desc: "Sie erhalten ein klares Ergebnis: keine Auffälligkeit erkennbar, weitere Daten für belastbare Aussage nötig, oder konkreter prüffähiger Verdachtsfall.",
  },
  {
    step: "04",
    title: "Optional: Expertenprüfung",
    desc: "Bei positivem Erstcheck starten wir die Vollanalyse. Prüffähige Fälle werden aufbereitet und zur Einreichung durch Ihren Zollberater oder Steuerberater vorbereitet.",
  },
]

const pricingCards = [
  {
    badge: "Erstcheck",
    title: "Kostenlos",
    price: "0 €",
    desc: "Erste Einschätzung ohne jede Verpflichtung. Keine Kreditkarte, kein Vertrag.",
    features: ["3–10 Dokumente ausreichend", "Erste Einschätzung", "Kein Demo-Call"],
    highlight: false,
  },
  {
    badge: "Vollanalyse",
    title: "Nach Vereinbarung",
    price: "Individuell abgestimmt",
    desc: "Für größere Datenmengen und vollständige historische Analyse mehrerer Perioden.",
    features: ["Große Datenmengen", "Priorisierte Prüffälle", "Aufbereitung zur Einreichung"],
    highlight: true,
  },
  {
    badge: "Erfolgsvergütung",
    title: "Risikogerechtes Modell",
    price: "Nur bei realisierter Erstattung",
    desc: "Vergütung entsteht ausschließlich dann, wenn tatsächliche Rückerstattungen oder Zollgutschriften realisiert werden.",
    features: ["Vergütung nur bei echten Rückerstattungen/Gutschriften", "Kein Kostenrisiko", "Volle Transparenz"],
    highlight: false,
  },
]

function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="border-b pt-16" style={{ backgroundColor: "#F8F9FA", borderBottomColor: "#e2e8f0" }}>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>{eyebrow}</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: "#0B192C" }}>{title}</h1>
        <p className="mx-auto max-w-2xl text-lg" style={{ color: "#475569" }}>{subtitle}</p>
      </div>
    </section>
  )
}

export default function AblaufKostenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <PageHeader
        eyebrow="Ablauf & Kosten"
        title="Schnell zur ersten Potenzialeinschätzung"
        subtitle="Von der Dateneingabe bis zur ersten Einschätzung – ohne lange Wartezeiten auf Demo-Calls."
      />

      <main className="flex-1">
        {/* Timeline */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col">
              {timelineSteps.map((item, i) => (
                <div key={item.step} className="flex items-start gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
                      style={{ backgroundColor: "#1E3A8A" }}
                    >
                      {item.step}
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div className="mt-1 w-0.5 flex-1 bg-slate-200" style={{ minHeight: "36px" }} />
                    )}
                  </div>
                  <div
                    className="mb-5 flex-1 rounded-xl border p-6 shadow-sm"
                    style={{ backgroundColor: "#F8F9FA", borderColor: "#e2e8f0" }}
                  >
                    <h3 className="mb-1.5 font-semibold" style={{ color: "#0B192C" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="preise" className="border-t py-16 md:py-24" style={{ backgroundColor: "#F8F9FA", borderTopColor: "#e2e8f0" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>Kostenmodell</p>
              <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "#0B192C" }}>
                Kostenloser Erstcheck. Vergütung nur bei Ergebnis.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pricingCards.map((card) => (
                <div
                  key={card.badge}
                  className={`rounded-xl p-8 ${card.highlight ? "shadow-md" : "shadow-sm"}`}
                  style={{
                    backgroundColor: "#ffffff",
                    border: card.highlight ? "2px solid #1E3A8A" : "1px solid #e2e8f0",
                  }}
                >
                  <div className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>
                    {card.badge}
                  </div>
                  <div className="mb-1 text-base font-semibold" style={{ color: "#475569" }}>{card.title}</div>
                  <div className="mb-4 text-2xl font-bold" style={{ color: "#0B192C" }}>{card.price}</div>
                  <p className="mb-6 text-sm" style={{ color: "#64748b" }}>{card.desc}</p>
                  <ul className="flex flex-col gap-2.5">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#334155" }}>
                        <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#1E3A8A" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t py-16" style={{ backgroundColor: "#0B192C", borderTopColor: "#1e2d3f" }}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Jetzt kostenlos starten
            </h2>
            <p className="mb-8 text-slate-400">
              Laden Sie 3–10 Beispieldokumente hoch und erhalten Sie Ihre erste Einschätzung – ohne Sales-Call, ohne Vertrag.
            </p>
            <Link
              href="/#scan"
              className="inline-flex items-center rounded-lg px-6 py-3 font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1E3A8A" }}
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
