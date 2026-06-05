import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Check, X } from "lucide-react"
import Link from "next/link"

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

function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="border-b pt-16" style={{ backgroundColor: "#f8fafc", borderBottomColor: "#e2e8f0" }}>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>{eyebrow}</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: "#0B192C" }}>{title}</h1>
        <p className="mx-auto max-w-2xl text-lg" style={{ color: "#475569" }}>{subtitle}</p>
      </div>
    </section>
  )
}

export default function ZielgruppePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <PageHeader
        eyebrow="Zielgruppe"
        title="Für wen ZollMetrics sinnvoll ist"
        subtitle="ZollMetrics ist auf importierende Unternehmen ausgerichtet, die regelmäßig Waren aus Nicht-EU-Ländern beziehen und Zugang zu ihren Zolldokumenten haben."
      />

      <main className="flex-1">
        <section id="vergleich" className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">

              {/* Geeignet für */}
              <div
                className="rounded-xl border p-8 shadow-sm"
                style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#dcfce7" }}
                  >
                    <Check className="h-4 w-4" style={{ color: "#16a34a" }} />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ color: "#14532d" }}>Geeignet für</h2>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {goodFit.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#16a34a" }} />
                      <span className="text-sm" style={{ color: "#166534" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weniger geeignet */}
              <div
                className="rounded-xl border p-8 shadow-sm"
                style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#f3f4f6" }}
                  >
                    <X className="h-4 w-4" style={{ color: "#9ca3af" }} />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ color: "#374151" }}>Weniger geeignet</h2>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {badFit.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#d1d5db" }} />
                      <span className="text-sm" style={{ color: "#6b7280" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t py-16" style={{ backgroundColor: "#0B192C", borderTopColor: "#1e2d3f" }}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Passt das zu Ihrem Unternehmen?
            </h2>
            <p className="mb-8 text-slate-400">
              Starten Sie mit der kostenlosen Potenzialanalyse – kein Sales-Call, kein Vertrag, keine Verpflichtung.
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
