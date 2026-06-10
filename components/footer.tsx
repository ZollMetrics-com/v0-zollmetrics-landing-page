import Link from "next/link"

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0B192C" }}>
      {/* Rechtlicher Hinweis */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/4 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Rechtlicher Hinweis
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
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
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 80" width="120" height="26" className="shrink-0">
              <defs>
                <linearGradient id="footerPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="footerAccentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00ADB5" />
                  <stop offset="100%" stopColor="#007A80" />
                </linearGradient>
              </defs>
              <g transform="translate(15, 10)">
                <rect x="0" y="20" width="12" height="35" rx="4" fill="url(#footerPrimaryGrad)" />
                <rect x="18" y="30" width="12" height="25" rx="4" fill="#94a3b8" opacity="0.8" />
                <rect x="36" y="10" width="12" height="45" rx="4" fill="url(#footerAccentGrad)" />
                <circle cx="24" cy="14" r="4.5" fill="url(#footerAccentGrad)" />
              </g>
              <text x="85" y="50" fontFamily="'Inter', 'Segoe UI', sans-serif" fontWeight="800" fontSize="32" fill="#ffffff" letterSpacing="-0.5">Zoll</text>
              <text x="154" y="50" fontFamily="'Inter', 'Segoe UI', sans-serif" fontWeight="300" fontSize="32" fill="#94a3b8" letterSpacing="-0.5">Metrics</text>
            </svg>
            <span className="ml-2 text-sm text-slate-500">&copy; 2026. Alle Rechte vorbehalten.</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/loesung" className="text-sm text-slate-400 transition-colors hover:text-white">Lösung</Link>
            <Link href="/ablauf-kosten" className="text-sm text-slate-400 transition-colors hover:text-white">Ablauf & Kosten</Link>
            <Link href="/zielgruppe" className="text-sm text-slate-400 transition-colors hover:text-white">Zielgruppe</Link>
            <Link href="/sicherheit" className="text-sm text-slate-400 transition-colors hover:text-white">Sicherheit & FAQ</Link>
            <span className="text-slate-600">|</span>
            <Link href="/impressum" className="text-sm text-slate-400 transition-colors hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="text-sm text-slate-400 transition-colors hover:text-white">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
