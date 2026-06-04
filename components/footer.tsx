import Link from "next/link"

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#060e1a" }}>
      {/* Rechtlicher Hinweis */}
      <div className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/4 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Rechtlicher Hinweis
            </p>
            <p className="text-sm leading-relaxed text-slate-500">
              ZollMetrics ist kein zugelassener Zollberater und erbringt keine steuerliche oder
              rechtliche Beratung im Sinne des Steuerberatungsgesetzes (StBerG) oder der
              Rechtsdienstleistungsgesetz (RDG). Unsere Leistung umfasst ausschließlich die
              datenbasierte Analyse von Importdokumenten auf strukturelle Auffälligkeiten sowie
              die Aufbereitung von Prüffällen zur Weitergabe an zugelassene Zollberater,
              Steuerberater oder Rechtsanwälte. ZollMetrics trifft keine Entscheidungen über
              Zollanmeldungen und vertritt keine Unternehmen gegenüber Zollbehörden. Die
              Nutzung unserer Analysen ersetzt keine qualifizierte Fachberatung.
            </p>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1d7afc]">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="8" width="3" height="6" rx="0.5" fill="white" />
                <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="white" />
                <rect x="11" y="2" width="3" height="12" rx="0.5" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">
              Zoll<span className="text-[#1d7afc]">Metrics</span>
            </span>
            <span className="ml-2 text-sm text-slate-600">
              &copy; 2026. Alle Rechte vorbehalten.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link href="/loesung" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
              Lösung
            </Link>
            <Link href="/ablauf-kosten" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
              Ablauf & Preise
            </Link>
            <Link href="/zielgruppe" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
              Zielgruppe
            </Link>
            <Link href="/sicherheit" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
              Sicherheit & FAQ
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/impressum" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
              Impressum
            </Link>
            <Link href="/agb" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
              AGB
            </Link>
            <Link href="/datenschutz" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
