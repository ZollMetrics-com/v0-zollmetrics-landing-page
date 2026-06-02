import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Versteckte Kosten im Import? Wir holen Ihre Zoll-Überzahlungen zurück.
            </h1>
            <p className="max-w-lg text-lg text-slate-600">
              Datenbasierte Rechnungsprüfung für den Mittelstand. 100 % erfolgsbasiert.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-blue-900 text-white hover:bg-blue-800">
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

          {/* Dashboard Placeholder */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Erstattungspotenzial</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  +12,4%
                </span>
              </div>
              <div className="mb-6 text-3xl font-bold text-slate-900">€ 47.850</div>
              
              {/* Chart Placeholder */}
              <div className="mb-4 flex h-32 items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-blue-900/80"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">156 Vorgänge</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-slate-600">23 Anomalien</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
