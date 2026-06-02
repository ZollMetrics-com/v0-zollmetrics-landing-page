import { Card, CardContent } from "@/components/ui/card"
import { Search, Database, Scale } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Datenanalyse",
    description: "Abgleich historischer Importdaten mit dem Unionszollkodex.",
  },
  {
    icon: Database,
    title: "Leak Detection",
    description: "Automatisiertes Finden von Fehlern, die manuelle Prüfer übersehen.",
  },
  {
    icon: Scale,
    title: "No Cure, No Pay",
    description: "Erfolgshonorar. Sie zahlen nur, wenn Sie Geld zurückbekommen.",
  },
]

export function FeatureSection() {
  return (
    <section id="ansatz" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-slate-900 md:text-4xl">
            Die Schnittstelle zwischen ERP und Zollrecht.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-200 bg-white">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900/10">
                  <feature.icon className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
