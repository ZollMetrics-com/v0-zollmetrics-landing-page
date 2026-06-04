"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, FileText, Minimize2, Trash2, Signature as FileSignature, ChevronDown } from "lucide-react"
import Link from "next/link"

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

function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="border-b pt-16" style={{ backgroundColor: "#f8fafc", borderBottomColor: "#e2e8f0" }}>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1a4fa8" }}>{eyebrow}</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: "#0B192C" }}>{title}</h1>
        <p className="mx-auto max-w-2xl text-lg" style={{ color: "#475569" }}>{subtitle}</p>
      </div>
    </section>
  )
}

export default function SicherheitPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <PageHeader
        eyebrow="Sicherheit & FAQ"
        title="Sensibler Upload, kontrollierter Erstcheck."
        subtitle="Importdaten sind vertraulich. Deshalb haben wir Upload-Prozess und Analyse mit mehrschichtiger Sicherheit konzipiert."
      />

      <main className="flex-1">
        {/* Security points */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5">
              {securityPoints.map((point) => (
                <div
                  key={point.number}
                  className="flex gap-5 rounded-xl border p-6 shadow-sm"
                  style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "#eef3fc" }}
                    >
                      <point.icon className="h-5 w-5" style={{ color: "#1a4fa8" }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#1a4fa8" }}>{point.number}</span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="mb-1 font-semibold" style={{ color: "#0B192C" }}>{point.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we don't claim */}
        <section className="border-t py-16" style={{ backgroundColor: "#f8fafc", borderTopColor: "#e2e8f0" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-xl border p-8 shadow-sm"
              style={{ backgroundColor: "#fffbeb", borderColor: "#fde68a" }}
            >
              <h2 className="mb-4 text-lg font-semibold" style={{ color: "#92400e" }}>Was wir nicht behaupten</h2>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "#78350f" }}>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  Wir garantieren keine bestimmte Erstattungshöhe – das Ergebnis hängt von Ihren konkreten Daten ab.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  Wir ersetzen keinen zugelassenen Zollberater oder Steuerberater.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  Wir treffen keine Entscheidungen über Zollanmeldungen und vertreten keine Unternehmen gegenüber Zollbehörden.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  Wir machen keine Zusagen über Rückerstattungsfristen – diese hängen von den zuständigen Hauptzollämtern ab.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t py-16 md:py-24" style={{ backgroundColor: "#ffffff", borderTopColor: "#e2e8f0" }}>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1a4fa8" }}>FAQ</p>
              <h2 className="text-3xl font-bold" style={{ color: "#0B192C" }}>Fragen und Antworten</h2>
            </div>

            <div
              className="overflow-hidden rounded-xl border shadow-sm"
              style={{ borderColor: "#e2e8f0" }}
            >
              {faqs.map((faq, i) => (
                <div key={i} className={i > 0 ? "border-t" : ""} style={{ borderColor: "#f1f5f9" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="font-medium" style={{ color: "#0B192C" }}>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                      style={{ color: "#94a3b8" }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="border-t px-6 pb-5 pt-4" style={{ borderColor: "#f1f5f9", backgroundColor: "#f8fafc" }}>
                      <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t py-16" style={{ backgroundColor: "#0B192C", borderTopColor: "#1e2d3f" }}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Bereit für Ihre Potenzialanalyse?
            </h2>
            <p className="mb-8 text-slate-400">
              Starten Sie den kostenlosen Erstcheck – ohne Demo-Call, ohne Vertrag.
            </p>
            <Link
              href="/#scan"
              className="inline-flex items-center rounded-lg px-6 py-3 font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1a4fa8" }}
            >
              Kostenlose Potenzialanalyse starten
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
