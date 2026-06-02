import { Upload, Search, FileCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Daten-Upload",
    description: "Sie stellen uns Ihre Zollbescheide, Einfuhranmeldungen und Handelsrechnungen als ZIP-Archiv oder über unser sicheres Portal bereit.",
  },
  {
    number: "02",
    icon: Search,
    title: "Analyse",
    description: "Wir prüfen jeden Vorgang auf Fehlklassifizierungen, überhöhte Zollwerte und ungenutzte Präferenzabkommen. Auffälligkeiten werden von unseren Experten validiert.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Erstattung",
    description: "Sie erhalten unterschriftsreife Anträge nach Art. 117 UZK für Ihr Hauptzollamt. Wir begleiten Sie bis zur erfolgreichen Auszahlung.",
  },
]

export function ProcessSection() {
  return (
    <section id="prozess" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-blue-900 md:text-4xl">
            Der Ablauf
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            In drei Schritten zu Ihrer Zollerstattung. Transparent, effizient und ohne Risiko.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-slate-200 md:block" />
              )}
              
              {/* Step Circle */}
              <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-white">
                <step.icon className="h-7 w-7" />
              </div>
              
              {/* Step Number */}
              <span className="mb-2 text-sm font-medium text-emerald-600">{step.number}</span>
              
              {/* Content */}
              <h3 className="mb-3 text-lg font-semibold text-blue-900">{step.title}</h3>
              <p className="max-w-xs text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
