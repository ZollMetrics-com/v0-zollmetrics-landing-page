import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AGB() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-[#0B1F3A]">Allgemeine Geschäftsbedingungen</h1>

          <div className="space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">§ 1 Geltungsbereich</h2>
              <p className="mt-2">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen von ZollMetrics
                (Adlerstraße 14, 90403 Nürnberg) gegenüber seinen Kunden, soweit nicht ausdrücklich
                abweichende Vereinbarungen getroffen wurden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">§ 2 Leistungsgegenstand</h2>
              <p className="mt-2">
                ZollMetrics erbringt Dienstleistungen im Bereich der Zollrückerstattung und
                Rechnungsprüfung. Die konkrete Leistungsbeschreibung ergibt sich aus dem jeweiligen
                Angebot oder dem individuell geschlossenen Vertrag.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">§ 3 Vergütung</h2>
              <p className="mt-2">
                Die Vergütung von ZollMetrics erfolgt ausschließlich erfolgsbasiert. Eine Zahlung
                wird nur fällig, wenn tatsächlich eine Zollrückerstattung für den Kunden erzielt
                wird. Die genaue Vergütungsquote wird im individuellen Vertrag festgelegt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">§ 4 Datenschutz und Vertraulichkeit</h2>
              <p className="mt-2">
                ZollMetrics behandelt alle vom Kunden übermittelten Daten und Unterlagen vertraulich
                und verwendet diese ausschließlich zur Erbringung der vereinbarten Leistungen.
                Näheres regelt die Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">§ 5 Haftung</h2>
              <p className="mt-2">
                ZollMetrics haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem
                Verhalten beruhen. Die Haftung für leichte Fahrlässigkeit ist – soweit gesetzlich
                zulässig – ausgeschlossen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">§ 6 Anwendbares Recht und Gerichtsstand</h2>
              <p className="mt-2">
                Es gilt deutsches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, Nürnberg.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">§ 7 Änderungen der AGB</h2>
              <p className="mt-2">
                ZollMetrics behält sich vor, diese AGB jederzeit mit Wirkung für die Zukunft zu
                ändern. Kunden werden über wesentliche Änderungen rechtzeitig informiert.
              </p>
            </section>

            <p className="mt-8 text-sm text-slate-500">Stand: Juni 2026</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
