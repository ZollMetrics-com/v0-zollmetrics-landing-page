import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Zap } from "lucide-react"

const benefits = [
  "Kostenloser Duty-Leak-Scan – ohne versteckte Kosten",
  "Schnelle Ergebnisse – ohne monatelange Beratungszyklen",
  "Klare Empfehlungen für euren Zollprofi – prüffähig vorbereitet",
]

export function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl" style={{ color: '#0B1F3A' }}>
                Versteckte Kosten im Import? Wir holen Ihre Zoll-Überzahlungen zurück.
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Wir prüfen Ihre Importdaten systematisch auf mögliche Zoll-Überzahlungen und bereiten prüffähige Fälle für euren Zollprofi vor.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" style={{ color: '#0B1F3A' }} />
                <h3 className="font-semibold" style={{ color: '#0B1F3A' }}>Kostenloser Duty-Leak-Scan</h3>
              </div>
              <p className="text-sm text-slate-600">
                Keine Verpflichtung. Keine versteckten Gebühren. Keine monatelangen Diskussionen – nur schnelle, konkrete Erkenntnisse für Ihren nächsten Schritt.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#0B1F3A' }}>
                <a href="#kontakt">Kontakt aufnehmen</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-900 hover:bg-slate-100">
                <a href="#ansatz">
                  Mehr erfahren
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-xl font-bold" style={{ color: '#0B1F3A' }}>
                Unser Ansatz
              </h2>

              <ul className="flex flex-col gap-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="text-sm text-slate-500">
                  Durchschnittliches Einsparpotenzial bei unseren Kunden:
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  8-15% der Zollabgaben
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
