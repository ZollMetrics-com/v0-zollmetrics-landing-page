import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Check } from "lucide-react"

export const metadata = {
  title: "Ablauf & Preise – ZollMetrics",
  description: "So funktioniert der Upload-Prozess und das Kostenmodell von ZollMetrics.",
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

export default function AblaufKostenPage() {
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
            <span className="text-sm font-medium text-[#5ba3ff]">Ablauf & Preise</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Schnell zur ersten Potenzialeinschätzung
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Von der Dateneingabe bis zur ersten Einschätzung – ohne lange Wartezeiten auf Demo-Calls.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* 4-step timeline */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#0d1b2e" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              {timelineSteps.map((item, i) => (
                <div key={item.step} className="flex items-start gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: "#1d7afc" }}
                    >
                      {item.step}
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div className="mt-2 w-0.5 flex-1 bg-white/10" style={{ minHeight: "32px" }} />
                    )}
                  </div>
                  <div
                    className="mb-6 flex-1 rounded-xl border border-white/10 p-6"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  >
                    <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="preise" className="border-t border-white/8 py-16 md:py-24" style={{ backgroundColor: "#0a1526" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
                Preise
              </p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Kostenloser Erstcheck. Vergütung nur bei Ergebnis.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pricingCards.map((card) => (
                <div
                  key={card.badge}
                  className={`rounded-xl p-8 ${
                    card.highlight
                      ? "border-2 border-[#1d7afc] shadow-lg shadow-[#1d7afc]/10"
                      : "border border-white/10"
                  }`}
                  style={{ backgroundColor: card.highlight ? "rgba(29,122,252,0.06)" : "rgba(255,255,255,0.03)" }}
                >
                  <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
                    {card.badge}
                  </div>
                  <div className="mb-1 text-lg font-bold text-white">{card.title}</div>
                  <div className="mb-4 text-2xl font-bold text-white">{card.price}</div>
                  <p className="mb-6 text-sm text-slate-400">{card.desc}</p>
                  <ul className="flex flex-col gap-2">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1d7afc]" />
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
        <section className="border-t border-white/8 py-16" style={{ backgroundColor: "#0d1b2e" }}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Jetzt kostenlos starten
            </h2>
            <p className="mb-8 text-slate-400">
              Laden Sie 3–10 Beispieldokumente hoch und erhalten Sie Ihre erste Einschätzung – ohne Sales-Call, ohne Vertrag.
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
