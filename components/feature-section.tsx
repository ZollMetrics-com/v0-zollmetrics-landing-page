import { Tag, DollarSign, Globe, Truck, RotateCcw, TrendingUp } from "lucide-react"

const checkAreas = [
  {
    icon: Tag,
    title: "Tarifnummern-Konsistenz",
    desc: "Prüfung, ob gleiche Waren konsistent klassifiziert werden – Abweichungen deuten auf Fehler oder Überzahlungen hin.",
  },
  {
    icon: DollarSign,
    title: "Zollwertbestandteile",
    desc: "Analyse der Bemessungsgrundlage: Werden Lizenzgebühren, Provisionen oder Transportkosten korrekt einbezogen?",
  },
  {
    icon: Globe,
    title: "Präferenzursprung",
    desc: "Überprüfung nicht genutzter Freihandelsabkommen und fehlerhafter Ursprungsnachweise.",
  },
  {
    icon: Truck,
    title: "Spediteurs- und Abgabenabrechnungen",
    desc: "Abgleich von Spediteurabrechnungen mit tatsächlich erhobenen Abgaben auf Diskrepanzen.",
  },
  {
    icon: RotateCcw,
    title: "Retouren, Defekte und Re-Exporte",
    desc: "Wurden für zurückgeschickte oder defekte Waren Zölle korrekt zurückgefordert?",
  },
  {
    icon: TrendingUp,
    title: "Wiederkehrende Importmuster",
    desc: "Identifikation von wiederkehrenden Fehlern über mehrere Perioden mit kumulativem Rückerstattungspotenzial.",
  },
]

export function FeatureSection() {
  return (
    <>
      {/* Upload wedge section */}
      <section id="ablauf" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
              Upload-Wedge
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Kein Sales-Prozess. Erstcheck direkt per Upload.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Bei ZollMetrics müssen Sie nicht erst mehrere Beratungsgespräche führen. Für den Erstcheck laden Sie ein kleines Test-Set Ihrer Importdokumente hoch. Wir prüfen, ob auffällige Muster oder mögliche Zoll-Überzahlungen sichtbar sind.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Für den Erstcheck reichen <strong>3–10 Dokumente</strong>: zum Beispiel Zollbescheide, Handelsrechnungen, Packlisten oder Spediteursabrechnungen.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "Schritt 1",
                title: "Kurzformular ausfüllen",
                desc: "Unternehmen, Importvolumen, Herkunftsländer und Warengruppen angeben.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="1.8"/>
                    <line x1="7" y1="9" x2="17" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="7" y1="12" x2="14" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="7" y1="15" x2="11" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                step: "Schritt 2",
                title: "Testdokumente hochladen",
                desc: "PDF, ZIP, CSV oder XLSX hochladen. Bitte zunächst nur ausgewählte Beispieldokumente.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4L12 16M12 16L8 12M12 16L16 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 19H20" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                step: "Schritt 3",
                title: "Potenzialeinschätzung erhalten",
                desc: "Wir melden uns mit einer ersten Einschätzung: keine Auffälligkeit, weitere Daten nötig oder prüffähiger Verdachtsfall.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: '#0B1F3A' }}>
                  {item.icon}
                </div>
                <p className="mb-1 text-sm font-semibold text-[#1d7afc]">{item.step}</p>
                <h3 className="mb-2 font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Check areas section */}
      <section id="loesung" className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
              Prüfbereiche
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Was ZollMetrics prüft
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Sechs systematische Prüfbereiche decken die häufigsten Quellen von Zoll-Überzahlungen ab.
            </p>
          </div>

          <div id="pruefbereiche" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {checkAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(29,122,252,0.1)' }}>
                  <area.icon className="h-5 w-5 text-[#1d7afc]" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{area.title}</h3>
                <p className="text-sm text-slate-600">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section id="warum" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
            Warum das wichtig ist
          </p>
          <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
            Importdaten sind komplex. Fehler bleiben oft jahrelang unentdeckt.
          </h2>
          <p className="mb-4 text-lg text-slate-600">
            Viele Unternehmen verlassen sich auf Lieferanten, Spediteure oder alte ERP-Klassifizierungen – ohne zu wissen, dass diese fehlerhaft sein können. Das Zollrecht ändert sich, Präferenzabkommen laufen aus oder werden neu verhandelt.
          </p>
          <p className="text-lg text-slate-600">
            ZollMetrics analysiert Ihre historischen Daten systematisch und findet Muster, die bei manuellen Prüfungen regelmäßig übersehen werden.
          </p>
        </div>
      </section>
    </>
  )
}
