"use client"

import { useState } from "react"
import { Check, X, Shield, Lock, Eye, Trash2, ChevronDown } from "lucide-react"

const timelineSteps = [
  {
    step: "01",
    title: "Erstcheck-Anfrage",
    desc: "Sie füllen das Kurzformular aus und laden 3–10 Beispieldokumente hoch. Kein Sales-Call, kein Vertrag.",
  },
  {
    step: "02",
    title: "Erste Sichtung",
    desc: "Wir prüfen Ihre Dokumente innerhalb von 1–2 Werktagen und bewerten das sichtbare Potenzial.",
  },
  {
    step: "03",
    title: "Potenzialeinschätzung",
    desc: "Sie erhalten ein klares Ergebnis: kein Potenzial erkennbar, weitere Daten nötig, oder konkreter Verdachtsfall.",
  },
  {
    step: "04",
    title: "Vollanalyse (optional)",
    desc: "Bei positivem Erstcheck starten wir die Vollanalyse. Erst dann fallen Kosten an – und nur bei Erfolg.",
  },
]

const goodFit = [
  "Importvolumen > 500.000 € / Jahr",
  "Regelmäßige Importe aus Drittländern",
  "Keine aktive Zoll-Compliance-Prüfung in den letzten 2 Jahren",
  "Fertigungsbetriebe, Händler, E-Commerce mit Eigenimport",
]

const badFit = [
  "Nur Inlandslieferungen oder EU-interne Importe",
  "Importvolumen < 100.000 € / Jahr",
  "Bereits laufende Zollprüfung durch Behörden",
  "Keine historischen Importdaten verfügbar",
]

const securityItems = [
  { icon: Lock, title: "256-bit SSL-Verschlüsselung", desc: "Alle Dateiübertragungen sind Ende-zu-Ende verschlüsselt." },
  { icon: Eye, title: "Zugriff nur durch Ihr Team", desc: "Keine automatische Weiterverarbeitung ohne Ihre Freigabe." },
  { icon: Shield, title: "DSGVO-konform", desc: "Serverstandort in der EU, Auftragsverarbeitungsvertrag verfügbar." },
  { icon: Trash2, title: "Automatische Löschung", desc: "Dateien werden nach Projektabschluss automatisch gelöscht." },
]

const faqs = [
  {
    q: "Welche Dokumente brauche ich für den Erstcheck?",
    a: "Für den Erstcheck reichen 3–10 Dokumente: zum Beispiel Zollbescheide, Handelsrechnungen, Packlisten oder Spediteursabrechnungen aus den letzten 12 Monaten.",
  },
  {
    q: "Was kostet der Erstcheck?",
    a: "Der Erstcheck ist komplett kostenlos und unverbindlich. Kosten entstehen nur bei einer Vollanalyse – und dabei nur, wenn wir tatsächlich Erstattungspotenzial nachweisen können.",
  },
  {
    q: "Wie lange dauert die Analyse?",
    a: "Der Erstcheck dauert 1–2 Werktage. Die Vollanalyse je nach Datenmenge zwischen einer und drei Wochen.",
  },
  {
    q: "Was passiert mit meinen Daten?",
    a: "Ihre Daten werden ausschließlich zur Analyse verwendet, nicht an Dritte weitergegeben und nach Projektabschluss gelöscht. Ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO ist verfügbar.",
  },
  {
    q: "Muss ich meinen Zolldienstleister wechseln?",
    a: "Nein. ZollMetrics ersetzt keinen Zollagenten oder -berater. Wir liefern die Analyse und prüffähig aufbereitete Fälle – Ihr Zollprofi oder Steuerberater reicht die Erstattungsanträge ein.",
  },
]

export function ProcessSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* 4-step timeline */}
      <section id="prozess" className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
              Ablauf
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Schnell zur ersten Potenzialeinschätzung
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Von der Erstanfrage bis zur Einschätzung in weniger als 48 Stunden.
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-6 top-6 hidden h-[calc(100%-48px)] w-0.5 bg-slate-200 md:left-1/2 md:-translate-x-0.5 lg:block" />

            <div className="flex flex-col gap-8">
              {timelineSteps.map((item, i) => (
                <div
                  key={item.step}
                  className={`relative flex items-start gap-6 lg:items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Step number bubble */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md lg:mx-auto" style={{ backgroundColor: '#0B1F3A' }}>
                    {item.step}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${i % 2 === 0 ? "lg:mr-[calc(50%+24px)]" : "lg:ml-[calc(50%+24px)]"}`}>
                    <h3 className="mb-1 font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target groups */}
      <section id="fuerwen" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
              Für wen
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Für wen ZollMetrics sinnvoll ist
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8">
              <h3 className="mb-5 flex items-center gap-2 font-semibold text-emerald-800">
                <Check className="h-5 w-5 text-emerald-600" />
                Geeignet für
              </h3>
              <ul className="flex flex-col gap-3">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-sm text-emerald-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="mb-5 flex items-center gap-2 font-semibold text-slate-700">
                <X className="h-5 w-5 text-slate-400" />
                Weniger geeignet
              </h3>
              <ul className="flex flex-col gap-3">
                {badFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
              Preise
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Transparent. Erfolgsbasiert.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">Erstcheck</div>
              <div className="mb-4 text-4xl font-bold text-slate-900">0 €</div>
              <p className="mb-6 text-sm text-slate-600">
                Kostenlose Erstanalyse Ihrer Beispieldokumente. Kein Vertrag, keine Verpflichtung.
              </p>
              <ul className="flex flex-col gap-2">
                {["3–10 Dokumente ausreichend", "Ergebnis in 1–2 Werktagen", "Keine Kreditkarte nötig"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border-2 border-[#1d7afc] bg-white p-8 shadow-md">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">Vollanalyse</div>
              <div className="mb-4 text-4xl font-bold text-slate-900">No Cure, No Pay</div>
              <p className="mb-6 text-sm text-slate-600">
                Nur bei nachgewiesenem und realisiertem Erstattungspotenzial. Kein Kostenrisiko für Sie.
              </p>
              <ul className="flex flex-col gap-2">
                {["Vollständige historische Datenanalyse", "Prüffähige Antragsunterlagen", "Begleitung bis zur Auszahlung"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 text-[#1d7afc]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security grid */}
      <section id="sicherheit" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
              Sicherheit
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Sensibler Upload, kontrollierter Erstcheck.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Importdaten sind vertraulich. Deshalb haben wir Upload und Analyse mit mehrschichtiger Sicherheit konzipiert.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {securityItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center"
              >
                <div className="mb-3 flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F3A]">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="mb-1 text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section id="faq" className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#1d7afc]">
              FAQ
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Häufige Fragen
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-slate-900">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-slate-100 px-6 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-slate-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
