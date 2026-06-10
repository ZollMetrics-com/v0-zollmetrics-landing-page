"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronDown } from "lucide-react"

const pricingCards = [
  {
    name: "Erstcheck",
    price: "0 €",
    desc: "Datenbasierte Voranalyse mit 3–10 Beispieldokumenten.",
    points: ["Kein Demo-Call nötig", "Upload in wenigen Minuten", "Erste Potenzialeinschätzung"],
  },
  {
    name: "Vollanalyse",
    price: "Individuell abgestimmt",
    desc: "Umfassende Prüfung Ihrer Importdaten nach dem Erstcheck.",
    points: ["Umfang nach Datenlage", "NDA/AVV nach Projektstart möglich", "Gesonderter Datenraum optional"],
  },
  {
    name: "Erfolgsvergütung",
    price: "Nur bei realisierter Erstattung",
    desc: "Vergütung ausschließlich bei tatsächlich erzielter Erstattung.",
    points: ["Kein Erstattungsversprechen", "Transparente Abstimmung vorab", "Fachliche Prüfung über Partner"],
  },
]

const faqs = [
  {
    q: "Verdient ZollMetrics schon am Erstcheck?",
    a: "Nein. Der Erstcheck ist kostenlos. Er dient ausschließlich einer datenbasierten Potenzialeinschätzung – ob sich eine tiefergehende fachliche Prüfung lohnen könnte.",
  },
  {
    q: "Ist ZollMetrics ein Zollberater?",
    a: "Nein. ZollMetrics erbringt keine Rechts-, Steuer- oder Zollberatung. Wir analysieren Importdaten auf strukturelle Auffälligkeiten und bereiten Prüffälle auf. Die fachliche Prüfung erfolgt optional über zugelassene Berater, Spediteure oder spezialisierte Partner.",
  },
  {
    q: "Müssen wir vor dem Upload einen Demo-Call buchen?",
    a: "Nein. Sie können das Kurzformular ausfüllen und ausgewählte Beispieldokumente direkt hochladen – ganz ohne vorherigen Sales-Call.",
  },
  {
    q: "Welche Dokumente eignen sich?",
    a: "Für den Erstcheck eignen sich 3–10 Beispieldokumente wie Zollbescheide, Handelsrechnungen, Packlisten oder Spediteursabrechnungen. Bitte laden Sie keine vollständigen Jahresarchive hoch.",
  },
  {
    q: "Was passiert, wenn keine Auffälligkeiten gefunden werden?",
    a: "Dann erhalten Sie eine entsprechende Rückmeldung. Es entstehen keine Kosten, und Sie sind zu nichts verpflichtet. Eine Rückerstattungsgarantie gibt es ausdrücklich nicht.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-medium" style={{ color: "#0B192C" }}>{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: "#1E3A8A" }}
        />
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed" style={{ color: "#475569" }}>{a}</p>}
    </div>
  )
}

export function PricingFaqSection() {
  return (
    <>
      {/* Pricing */}
      <section id="preise" className="border-t py-16 md:py-24" style={{ backgroundColor: "#ffffff", borderTopColor: "#e2e8f0" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>
              Kosten
            </p>
            <h2 className="text-3xl font-bold text-balance md:text-4xl" style={{ color: "#0B192C" }}>
              Kostenloser Erstcheck. Vergütung nur bei Ergebnis.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pricingCards.map((card) => (
              <div
                key={card.name}
                className="flex flex-col rounded-xl border p-7 shadow-sm"
                style={{ backgroundColor: "#F8F9FA", borderColor: "#e2e8f0" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>
                  {card.name}
                </p>
                <p className="mt-3 text-2xl font-bold" style={{ color: "#0B192C" }}>{card.price}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#64748b" }}>{card.desc}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#1E3A8A" }} />
                      <span className="text-sm" style={{ color: "#475569" }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/#scan"
              className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1E3A8A" }}
            >
              Kostenlosen Erstcheck starten
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t py-16 md:py-24" style={{ backgroundColor: "#F8F9FA", borderTopColor: "#e2e8f0" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>
              Häufige Fragen
            </p>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "#0B192C" }}>
              Antworten auf häufige Fragen
            </h2>
          </div>

          <div className="rounded-xl border bg-white px-6 shadow-sm" style={{ borderColor: "#e2e8f0" }}>
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
