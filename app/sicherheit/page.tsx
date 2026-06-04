"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, FileText, Minimize2, Trash2, Signature as FileSignature, ChevronDown } from "lucide-react"

const securityPoints = [
  {
    number: "01",
    icon: Mail,
    title: "Kein Versand per normaler E-Mail",
    desc: "Importdokumente enthalten sensible Unternehmensdaten. Wir akzeptieren keine unverschlüsselten E-Mail-Anhänge. Der Upload erfolgt ausschließlich über unser verschlüsseltes Portal.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Erstcheck mit begrenztem Test-Set",
    desc: "Für den Erstcheck benötigen wir keine vollständigen Jahresarchive. 3–10 ausgewählte Beispieldokumente reichen aus. Sie behalten die volle Kontrolle über den Umfang der übermittelten Daten.",
  },
  {
    number: "03",
    icon: Minimize2,
    title: "Datenminimierung",
    desc: "Wir erheben nur die Daten, die für die Analyse tatsächlich erforderlich sind. Nicht benötigte Angaben werden nicht verarbeitet.",
  },
  {
    number: "04",
    icon: Trash2,
    title: "Löschung vorab vereinbart",
    desc: "Vor der Übermittlung von Dokumenten vereinbaren wir schriftlich den Löschzeitpunkt. Nach Abschluss des Projekts werden alle Dokumente und abgeleiteten Daten gelöscht.",
  },
  {
    number: "05",
    icon: FileSignature,
    title: "NDA/AVV möglich",
    desc: "Auf Wunsch schließen wir vor dem Erstcheck eine Vertraulichkeitsvereinbarung (NDA) oder einen Auftragsverarbeitungsvertrag (AVV gemäß Art. 28 DSGVO) ab.",
  },
]

const faqs = [
  {
    q: "Verdient ZollMetrics schon am Erstcheck?",
    a: "Nein. Der Erstcheck ist vollständig kostenlos und unverbindlich. Wir verdienen ausschließlich dann, wenn durch unsere Vollanalyse tatsächliche Zollrückerstattungen oder -gutschriften realisiert werden.",
  },
  {
    q: "Ist ZollMetrics ein Zollberater?",
    a: "Nein. ZollMetrics ist kein zugelassener Zollberater und erbringt keine steuerliche oder rechtliche Beratung im Sinne des StBerG oder RDG. Unsere Leistung umfasst die datenbasierte Analyse und Aufbereitung von Prüffällen. Die Einreichung von Erstattungsanträgen erfolgt durch zugelassene Zollberater, Steuerberater oder Rechtsanwälte.",
  },
  {
    q: "Welche Dateiformate werden akzeptiert?",
    a: "Wir akzeptieren PDF, CSV, XLSX und ZIP-Archive. Für den Erstcheck genügen in der Regel gescannte PDFs der Zollbescheide und Handelsrechnungen.",
  },
  {
    q: "Werden meine Daten an Dritte weitergegeben?",
    a: "Nein. Ihre Dokumente und die daraus abgeleiteten Analysedaten werden nicht an Dritte weitergegeben. Intern arbeiten nur autorisierte Mitarbeiter mit den übermittelten Dokumenten.",
  },
  {
    q: "Was passiert, wenn kein Potenzial gefunden wird?",
    a: "Sie erhalten eine klare Rückmeldung ohne Kosten. Keine weiteren Schritte, keine Verpflichtungen. Wenn das Erstcheck-Ergebnis lautet 'keine Auffälligkeit erkennbar', entstehen für Sie keine Kosten.",
  },
  {
    q: "Wie lange dauert der Erstcheck?",
    a: "In der Regel 1–2 Werktage nach vollständigem Eingang der Dokumente und des ausgefüllten Kurzformulars.",
  },
]

export default function SicherheitPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#060e1a" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden pt-16"
        style={{ backgroundColor: "#0a1526" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(29,122,252,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(29,122,252,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(29,122,252,0.13) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1d7afc]/30 bg-[#1d7afc]/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1d7afc]" />
            <span className="text-sm font-medium text-[#5ba3ff]">Sicherheit & FAQ</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Sensibler Upload, kontrollierter Erstcheck.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Importdaten sind vertraulich. Deshalb haben wir Upload-Prozess und Analyse mit mehrschichtiger Sicherheit konzipiert.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Security points */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#0d1b2e" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              {securityPoints.map((point) => (
                <div
                  key={point.number}
                  className="flex gap-5 rounded-xl border border-white/10 p-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(29,122,252,0.15)" }}
                    >
                      <point.icon className="h-5 w-5 text-[#1d7afc]" />
                    </div>
                    <span className="text-xs font-bold text-[#1d7afc]">{point.number}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-white">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we don't claim */}
        <section className="border-t border-white/8 py-16" style={{ backgroundColor: "#0a1526" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-xl border border-amber-500/20 p-8"
              style={{ backgroundColor: "rgba(245,158,11,0.05)" }}
            >
              <h2 className="mb-4 text-xl font-bold text-white">Was wir nicht behaupten</h2>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed text-slate-400">
                <li>• Wir garantieren keine bestimmte Erstattungshöhe – das Ergebnis hängt von Ihren konkreten Daten ab.</li>
                <li>• Wir ersetzen keinen zugelassenen Zollberater oder Steuerberater.</li>
                <li>• Wir treffen keine Entscheidungen über Zollanmeldungen und vertreten keine Unternehmen gegenüber Zollbehörden.</li>
                <li>• Wir machen keine Zusagen über Rückerstattungsfristen – diese hängen von den zuständigen Hauptzollämtern ab.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ accordion */}
        <section id="faq" className="border-t border-white/8 py-16 md:py-24" style={{ backgroundColor: "#0d1b2e" }}>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">FAQ</p>
              <h2 className="text-3xl font-bold text-white">Fragen und Antworten</h2>
            </div>

            <div
              className="overflow-hidden rounded-xl border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              {faqs.map((faq, i) => (
                <div key={i} className={i > 0 ? "border-t border-white/8" : ""}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-white">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-white/8 px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-slate-400">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
