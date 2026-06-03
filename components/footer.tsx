export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#F5F4F2] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-500">
            &copy; 2026 ZollMetrics. Alle Rechte vorbehalten.
          </p>

          <div className="flex gap-6">
            <a
              href="/impressum"
              className="text-sm text-slate-500 transition-colors hover:text-slate-800"
            >
              Impressum
            </a>
            <a
              href="/agb"
              className="text-sm text-slate-500 transition-colors hover:text-slate-800"
            >
              AGB
            </a>
            <a
              href="/datenschutz"
              className="text-sm text-slate-500 transition-colors hover:text-slate-800"
            >
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
