import { Card, CardContent } from "@/components/ui/card"
import { Search, Database, Scale, Check } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Datenanalyse",
    description: "Wir gleichen Ihre historischen Importdaten systematisch mit dem Unionszollkodex ab und identifizieren Unstimmigkeiten bei Tarifnummern, Zollwerten und Präferenzursprüngen.",
    benefits: ["Automatisierte Tarifvalidierung", "Zollwertprüfung nach UZK Art. 70-74"],
  },
  {
    icon: Database,
    title: "Leak Detection",
    description: "Unsere Algorithmen finden Fehler, die bei manuellen Prüfungen regelmäßig übersehen werden: Fehlklassifizierungen, nicht genutzte Präferenzen und überhöhte Bemessungsgrundlagen.",
    benefits: ["KI-gestützte Anomalieerkennung", "Branchenspezifische Benchmarks"],
  },
  {
    icon: Scale,
    title: "No Cure, No Pay",
    description: "Wir arbeiten rein erfolgsbasiert. Sie zahlen nur, wenn wir tatsächlich Erstattungen für Sie erzielen. Kein Kostenrisiko, kein Aufwand für Sie.",
    benefits: ["100% erfolgsbasiert", "Keine versteckten Kosten"],
  },
]

export function FeatureSection() {
  return (
    <section id="ansatz" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl" style={{ color: '#0B1F3A' }}>
            Die Schnittstelle zwischen ERP und Zollrecht
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Wir verbinden Ihre Unternehmensdaten mit zollrechtlicher Expertise und finden Einsparpotenziale, die im Tagesgeschäft verborgen bleiben.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-200 bg-white shadow-sm">
              <CardContent className="flex flex-col p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(11,31,58,0.08)' }}>
                  <feature.icon className="h-6 w-6" style={{ color: '#0B1F3A' }} />
                </div>
                <h3 className="mb-3 text-lg font-semibold" style={{ color: '#0B1F3A' }}>
                  {feature.title}
                </h3>
                <p className="mb-4 text-sm text-slate-600">{feature.description}</p>
                <ul className="mt-auto flex flex-col gap-2">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
