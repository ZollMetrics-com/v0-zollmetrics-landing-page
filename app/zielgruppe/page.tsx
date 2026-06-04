import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Check, X } from "lucide-react"

export const metadata = {
  title: "Zielgruppe – Für wen ZollMetrics sinnvoll ist",
  description: "ZollMetrics richtet sich an importierende Unternehmen mit regelmäßigem Nicht-EU-Importvolumen.",
}

const goodFit = [
  "E-Commerce-Importeure mit regelmäßigen Nicht-EU-Importen",
  "Amazon-, Shopify- und Shopware-Händler",
  "Ersatzteil- und Elektronikzubehörhändler",
  "Unternehmen mit wiederkehrenden Lieferanten",
  "Importeure ohne eigene Zollabteilung",
]

const badFit = [
  "Einzelimporte ohne Wiederholung",
  "Sehr kleine Importvolumen",
  "Unternehmen ohne Zugriff auf Zollbescheide",
  "Fälle, die sofortige rechtliche Beratung erwarten",
]

export default function ZielgruppePage() {
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
            <span className="text-sm font-medium text-[#5ba3ff]">Zielgruppe</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Für wen ZollMetrics sinnvoll ist
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            ZollMetrics ist auf importierende Unternehmen ausgerichtet, die regelmäßig Waren aus Nicht-EU-Ländern beziehen und Zugang zu ihren Zolldokumenten haben.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Comparison grid */}
        <section id="vergleich" className="py-16 md:py-24" style={{ backgroundColor: "#0d1b2e" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Good fit */}
              <div
                className="rounded-xl border border-emerald-500/20 p-8"
                style={{ backgroundColor: "rgba(16,185,129,0.05)" }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                    <Check className="h-4 w-4 text-emerald-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Geeignet für</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {goodFit.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bad fit */}
              <div
                className="rounded-xl border border-white/10 p-8"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <X className="h-4 w-4 text-slate-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Weniger geeignet</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {badFit.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                      <span className="text-sm text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/8 py-16" style={{ backgroundColor: "#0a1526" }}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Passt das zu Ihrem Unternehmen?
            </h2>
            <p className="mb-8 text-slate-400">
              Starten Sie mit dem kostenlosen Erstcheck – kein Sales-Call, kein Vertrag, keine Verpflichtung.
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
