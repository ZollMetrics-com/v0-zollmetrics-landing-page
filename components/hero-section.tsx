import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

const benefits = [
  "Analyse historischer Zolldaten auf Basis des Unionszollkodex",
  "Identifikation von Fehlbewertungen und überhöhten Abgaben",
  "Erstellung unterschriftsreifer Erstattungsanträge",
  "Erfolgsbasierte Vergütung ohne Kostenrisiko",
]

export function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl" style={{ color: '#0B1F3A' }}>
              Versteckte Kosten im Import? Wir holen Ihre Zoll-Überzahlungen zurück.
            </h1>
            <p className="max-w-lg text-lg text-slate-600">
              Datenbasierte Rechnungsprüfung für den Mittelstand. 100 % erfolgsbasiert.
            </p>
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
                Was wir für Sie tun
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
                  Durchschnittliche Erstattungsquote bei unseren Kunden:
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
