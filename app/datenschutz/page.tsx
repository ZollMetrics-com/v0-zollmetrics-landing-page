import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Datenschutz() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-[#0B1F3A]">Datenschutzerklärung</h1>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">1. Datenschutz auf einen Blick</h2>
              <p className="mt-2">
                ZollMetrics nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung erläutert, welche Daten wir erfassen, wie wir diese verarbeiten und welche Rechte Sie haben.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">2. Verantwortliche Stelle</h2>
              <p className="mt-2">
                Verantwortliche Stelle für die Datenverarbeitung gemäß DSGVO:
              </p>
              <p className="mt-2 text-sm">
                ZollMetrics<br />
                Adlerstraße 14<br />
                90403 Nürnberg<br />
                E-Mail: team@zollmetrics.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">3. Art der verarbeiteten Daten</h2>
              <p className="mt-2">Wir verarbeiten folgende Kategorien von Daten:</p>
              <ul className="mt-3 list-inside space-y-2 text-sm">
                <li>• <strong>Kontaktdaten:</strong> Name, E-Mail-Adresse, Telefonnummer</li>
                <li>• <strong>Unternehmensdaten:</strong> Unternehmensname, Branche</li>
                <li>• <strong>Geschäftsdaten:</strong> Zollbescheide, Einfuhranmeldungen, Handelsrechnungen und weitere Zolldokumente</li>
                <li>• <strong>Nutzungsdaten:</strong> IP-Adresse, Browser-Typ, Besuchszeiten (via Analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">4. Rechtsgrundlagen der Verarbeitung</h2>
              <p className="mt-2">Die Verarbeitung Ihrer Daten erfolgt auf folgenden Rechtsgrundlagen:</p>
              <ul className="mt-3 list-inside space-y-2 text-sm">
                <li>• <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Verarbeitung zur Erbringung unserer Dienstleistungen</li>
                <li>• <strong>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):</strong> Verarbeitung zu Zwecken der Geschäftsoptimierung und Sicherheit</li>
                <li>• <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Für Marketing und Newsletter (nur mit Ihrer Zustimmung)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">5. Speicherung und Sicherheit Ihrer Daten</h2>
              <p className="mt-2">
                Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen.
              </p>
              <ul className="mt-2 list-inside space-y-1 text-sm">
                <li>• Verschlüsselte Datenübertragung (SSL/TLS)</li>
                <li>• Datenminimierung: Im Erstcheck nur ausgewählte Beispieldokumente</li>
                <li>• Zugriffsbeschränkung auf befugte Personen</li>
              </ul>
              <p className="mt-3 text-sm">
                Für die technische Bereitstellung der Website und die Entgegennahme von Dokumenten setzen
                wir externe Dienstleister ein (siehe Abschnitte zu Uploadcare, Vercel und Supabase).
                Dabei kann eine Verarbeitung auch außerhalb Deutschlands bzw. der EU erfolgen.
              </p>
              <p className="mt-3">
                <strong>Speicherdauer:</strong> Geschäftsdaten (Zolldokumente) werden nach Abschluss des Erstchecks bzw. des Projekts gelöscht. Kontaktdaten werden für maximal 12 Monate gespeichert oder bis Sie diese Speicherung widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">6. Weitergabe von Daten an Dritte</h2>
              <p className="mt-2">
                Ihre persönlichen Daten werden nicht an Dritte weitergegeben, es sei denn:
              </p>
              <ul className="mt-3 list-inside space-y-2 text-sm">
                <li>• Sie haben ausdrücklich zugestimmt</li>
                <li>• Wir sind gesetzlich verpflichtet (z.B. für Behördenauskünfte)</li>
                <li>• Technische Dienstleister verarbeiten Daten im Auftrag (Auftragsverarbeiter nach Art. 28 DSGVO)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">7. Dateiübermittlung über Uploadcare</h2>
              <p className="mt-2">
                Für die technische Entgegennahme von Testdokumenten nutzen wir Uploadcare. Dabei können
                hochgeladene Dateien, Dateinamen, technische Metadaten, Upload-Zeitpunkte und Abruflinks
                verarbeitet werden. Die Verarbeitung erfolgt ausschließlich zur Bearbeitung der angefragten
                datenbasierten Voranalyse. Bitte laden Sie nur Dokumente hoch, zu deren Übermittlung Sie
                berechtigt sind, und im Erstcheck nur ausgewählte Beispieldokumente.
              </p>
              <p className="mt-3 text-sm">
                Für vollständige Projektanalysen oder größere Datenmengen kann ein gesonderter Datenraum
                mit individuell abgestimmten Datenschutz- und Vertraulichkeitsvereinbarungen eingerichtet werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">8. Reichweitenmessung mit Vercel Analytics</h2>
              <p className="mt-2">
                Zur technischen Analyse der Website-Nutzung kann Vercel Analytics eingesetzt werden. Dabei
                werden Nutzungsdaten in aggregierter Form ausgewertet. Wir nutzen diese Daten, um die Website
                technisch und inhaltlich zu verbessern.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">9. Datenraum / Datenbank über Supabase</h2>
              <p className="mt-2">
                Für bestimmte Projekt- oder Datenraumfunktionen kann Supabase eingesetzt werden. Dabei können
                Formularangaben, Metadaten und projektbezogene Informationen verarbeitet werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">10. Keine Zollberatung</h2>
              <p className="mt-2">
                Die Verarbeitung der Dokumente dient ausschließlich einer datenbasierten Voranalyse.
                ZollMetrics erbringt keine Rechts-, Steuer- oder Zollberatung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">11. Ihre Rechte</h2>
              <p className="mt-2">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
              <ul className="mt-3 list-inside space-y-2 text-sm">
                <li>• <strong>Auskunftsrecht:</strong> Sie können erfahren, welche Daten wir über Sie speichern</li>
                <li>• <strong>Berichtigungsrecht:</strong> Sie können fehlerhafte Daten korrigieren lassen</li>
                <li>• <strong>Löschungsrecht (Recht auf Vergessenwerden):</strong> Sie können die Löschung Ihrer Daten verlangen (Art. 17 DSGVO)</li>
                <li>• <strong>Widerspruchsrecht:</strong> Sie können einer Datenverarbeitung widersprechen (Art. 21 DSGVO)</li>
                <li>• <strong>Datenportabilität:</strong> Sie können Ihre Daten in strukturierter Form erhalten</li>
              </ul>
              <p className="mt-3 text-sm">
                Um diese Rechte auszuüben, kontaktieren Sie uns unter: <a href="mailto:team@zollmetrics.com" className="text-[#0B1F3A] underline">team@zollmetrics.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">12. Kontakt zum Datenschutzbeauftragten</h2>
              <p className="mt-2">
                Bei Fragen zum Datenschutz erreichen Sie uns unter: <a href="mailto:team@zollmetrics.com" className="text-[#0B1F3A] underline">team@zollmetrics.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">13. Beschwerderecht</h2>
              <p className="mt-2">
                Sie haben das Recht, eine Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen, wenn Sie der Ansicht sind, dass wir Ihre Rechte verletzten. Die zuständige Behörde für Bayern ist:
              </p>
              <p className="mt-3 text-sm">
                Bayerisches Landesamt für Datenschutzaufsicht<br />
                Postfach 606<br />
                91511 Ansbach<br />
                Telefon: +49 981 53 1300<br />
                E-Mail: poststelle@lda.bayern.de
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0B1F3A]">14. Änderungen dieser Datenschutzerklärung</h2>
              <p className="mt-2">
                Wir können diese Datenschutzerklärung jederzeit anpassen. Die aktuelle Version wird auf unserer Website veröffentlicht.
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
