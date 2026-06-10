import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Impressum() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-[#0B1F3A]">Impressum</h1>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">Angaben gemäß § 5 TMG</h2>
              <p className="mt-2">
                ZollMetrics<br />
                Projekt in Vorbereitung der Gesellschaftsgründung<br />
                Adlerstraße 14<br />
                90403 Nürnberg<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">Anbieter / Projektverantwortliche</h2>
              <p className="mt-2">
                Normann Frei<br />
                Benjamin Eisenhammer<br />
                Tommy Dergunov
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">Kontakt</h2>
              <p className="mt-2">
                E-Mail:{" "}
                <a href="mailto:team@zollmetrics.com" className="text-[#0B1F3A] underline hover:opacity-80">
                  team@zollmetrics.com
                </a>
                <br />
                Telefon:{" "}
                <a href="tel:+4917631384856" className="text-[#0B1F3A] underline hover:opacity-80">
                  +49 176 31384856
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p className="mt-2">
                Normann Frei<br />
                Adlerstraße 14<br />
                90403 Nürnberg
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">Haftungsausschluss</h2>
              <p className="mt-2">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
