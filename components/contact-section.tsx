"use client"

import { useState, useRef } from "react"
import { Check, CircleAlert as AlertCircle, ChevronRight, ChevronLeft, X, Paperclip } from "lucide-react"
import { uploadFile } from "@uploadcare/upload-client"

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface FormData {
  vorname: string
  nachname: string
  email: string
  unternehmen: string
  website: string
  rolle: string
  importvorgaenge: string
  importvolumen: string
  herkunftslaender: string
  warengruppen: string
  zolldienstleister: string
  letzteZollpruefung: string
  nachricht: string
}

const EMPTY: FormData = {
  vorname: "", nachname: "", email: "", unternehmen: "", website: "", rolle: "",
  importvorgaenge: "", importvolumen: "", herkunftslaender: "", warengruppen: "",
  zolldienstleister: "", letzteZollpruefung: "", nachricht: "",
}

const steps = [
  { number: 1, label: "Kontakt" },
  { number: 2, label: "Importdaten" },
  { number: 3, label: "Dokumente" },
]

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s.number} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                s.number < current
                  ? "bg-[#1E3A8A] text-white"
                  : s.number === current
                  ? "bg-[#1E3A8A] text-white shadow-md"
                  : "border border-slate-300 bg-white text-slate-400"
              }`}
            >
              {s.number < current ? <Check className="h-4 w-4" /> : s.number}
            </div>
            <span
              className={`text-xs font-medium ${
                s.number === current ? "text-[#1E3A8A]" : s.number < current ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`mb-5 h-0.5 w-16 transition-colors sm:w-24 ${
                s.number < current ? "bg-[#1E3A8A]" : "bg-slate-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function Field({
  label, required, hint, error, children,
}: {
  label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}{required && <span className="ml-0.5 text-[#1E3A8A]"> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#1E3A8A]">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

function TextInput({
  id, placeholder, value, onChange, type = "text", required, error,
}: {
  id: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; error?: boolean
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-1 ${
        error
          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500"
          : "border-slate-300 bg-white focus:border-[#1E3A8A] focus:ring-[#1E3A8A]"
      }`}
    />
  )
}

function SelectInput({
  id, value, onChange, options, placeholder, required,
}: {
  id: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string; required?: boolean
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-[#1E3A8A] focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export function ContactSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(EMPTY)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({})
  const [consent, setConsent] = useState({ berechtigt: false, keineBeratung: false, datenschutz: false })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof FormData) => (v: string) => {
    setFormData((p) => ({ ...p, [key]: v }))
    if (v) setValidationErrors((p) => ({ ...p, [key]: false }))
  }

  const step1Fields = ["vorname", "nachname", "email", "unternehmen"] as const
  const step2Fields = ["importvorgaenge", "importvolumen", "herkunftslaender", "warengruppen"] as const

  const validateStep1 = () => {
    const errors: Record<string, boolean> = {}
    let valid = true
    for (const key of step1Fields) {
      if (!formData[key]) { errors[key] = true; valid = false }
    }
    setValidationErrors((p) => ({ ...p, ...errors }))
    return valid
  }

  const validateStep2 = () => {
    const errors: Record<string, boolean> = {}
    let valid = true
    for (const key of step2Fields) {
      if (!formData[key]) { errors[key] = true; valid = false }
    }
    setValidationErrors((p) => ({ ...p, ...errors }))
    return valid
  }

  const goNext = () => {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  const goBack = () => {
    setValidationErrors({})
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? [])
    if (newFiles.length === 0) return
    setSelectedFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name))
      return [...prev, ...newFiles.filter((f) => !existingNames.has(f.name))]
    })
    e.target.value = ""
    if (uploadStatus === "error") {
      setUploadStatus("idle")
      setErrorMessage("")
    }
  }

  const removeFile = (name: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== name))
  }

  const allConsentGiven = consent.berechtigt && consent.keineBeratung && consent.datenschutz
  const canSubmit = selectedFiles.length > 0 && !!formData.unternehmen && allConsentGiven && uploadStatus !== "uploading"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFiles.length === 0) {
      setErrorMessage("Bitte laden Sie mindestens ein Dokument hoch.")
      setUploadStatus("error")
      return
    }
    if (!allConsentGiven) {
      setErrorMessage("Bitte bestätigen Sie alle Pflichtangaben, bevor Sie absenden.")
      setUploadStatus("error")
      return
    }
    setUploadStatus("uploading")
    setErrorMessage("")

    try {
      // TODO (Sicherheit): Uploadcare erzeugt standardmäßig öffentlich abrufbare CDN-URLs (store: "auto").
      // Für sensible Zolldokumente sollte mittelfristig auf zugriffsbeschränkte/signierte URLs oder
      // einen geschützten Datenraum umgestellt werden. Außerdem sollte NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
      // in Produktion gesetzt sein – der "demopublickey"-Fallback ist nur für die Entwicklung gedacht.
      const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY ?? "demopublickey"

      const uploaded = await Promise.all(
        selectedFiles.map(async (file) => {
          const result = await uploadFile(file, { publicKey, store: "auto" })
          return { name: file.name, cdnUrl: result.cdnUrl }
        })
      )

      const res = await fetch("/api/upload-to-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, files: uploaded }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || "Fehler beim Speichern. Bitte erneut versuchen.")
      }

      setUploadStatus("success")
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Unbekannter Fehler.")
      setUploadStatus("error")
    }
  }

  if (uploadStatus === "success") {
    return (
      <section id="scan" className="border-t py-16 md:py-24" style={{ backgroundColor: "#F8F9FA", borderTopColor: "#e2e8f0" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col items-center gap-6 rounded-2xl border p-12 text-center shadow-sm"
            style={{ backgroundColor: "#ffffff", borderColor: "#bbf7d0" }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "#dcfce7" }}>
              <Check className="h-8 w-8" style={{ color: "#16a34a" }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold" style={{ color: "#0B192C" }}>
                Übertragung erfolgreich
              </h3>
              <p className="mt-3" style={{ color: "#475569" }}>
                Ihr Datenpaket für <strong style={{ color: "#0B192C" }}>{formData.unternehmen}</strong> wurde gespeichert.
                Unsere Experten wurden benachrichtigt.
              </p>
              <p className="mt-3 text-sm" style={{ color: "#64748b" }}>
                Wir prüfen Ihre Dokumente und melden uns innerhalb von 1–2 Werktagen.
              </p>
            </div>
            <button
              onClick={() => {
                setUploadStatus("idle")
                setStep(1)
                setFormData(EMPTY)
                setSelectedFiles([])
                setValidationErrors({})
                setConsent({ berechtigt: false, keineBeratung: false, datenschutz: false })
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Weitere Anfrage senden
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="scan" className="border-t py-16 md:py-24" style={{ backgroundColor: "#F8F9FA", borderTopColor: "#e2e8f0" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1E3A8A" }}>
            Zoll-Audit starten
          </p>
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "#0B192C" }}>
            Laden Sie ein kleines Test-Set hoch.
          </h2>
          <p className="mx-auto mt-3 max-w-xl" style={{ color: "#64748b" }}>
            Bitte keine vollständigen Jahresarchive im Erstcheck.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center">
            <StepIndicator current={step} />
          </div>

          <div
            className="rounded-2xl border p-8 shadow-sm"
            style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
          >
            <form onSubmit={handleSubmit} noValidate>

              {/* ── STEP 1: Kontakt ── */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <h3 className="text-lg font-semibold" style={{ color: "#0B192C" }}>Ihre Kontaktdaten</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Vorname" required error={validationErrors.vorname ? "Pflichtfeld" : undefined}>
                      <TextInput id="vorname" placeholder="Max" value={formData.vorname} onChange={set("vorname")} required error={validationErrors.vorname} />
                    </Field>
                    <Field label="Nachname" required error={validationErrors.nachname ? "Pflichtfeld" : undefined}>
                      <TextInput id="nachname" placeholder="Mustermann" value={formData.nachname} onChange={set("nachname")} required error={validationErrors.nachname} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Geschäftliche E-Mail" required error={validationErrors.email ? "Pflichtfeld" : undefined}>
                      <TextInput id="email" type="email" placeholder="max@unternehmen.de" value={formData.email} onChange={set("email")} required error={validationErrors.email} />
                    </Field>
                    <Field label="Unternehmen (Firmenname)" required error={validationErrors.unternehmen ? "Pflichtfeld – wird für Ihren Datenraum benötigt" : undefined}>
                      <TextInput id="unternehmen" placeholder="Muster GmbH" value={formData.unternehmen} onChange={set("unternehmen")} required error={validationErrors.unternehmen} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Website">
                      <TextInput id="website" type="url" placeholder="https://www.unternehmen.de" value={formData.website} onChange={set("website")} />
                    </Field>
                    <Field label="Rolle / Funktion">
                      <TextInput id="rolle" placeholder="z. B. Einkaufsleiter, GF" value={formData.rolle} onChange={set("rolle")} />
                    </Field>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                    >
                      Weiter <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Importdaten ── */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <h3 className="text-lg font-semibold" style={{ color: "#0B192C" }}>Ihre Importsituation</h3>
                  <Field
                    label="Geschätzte Importvorgänge pro Jahr"
                    required
                    hint="Gemeint sind Zoll-/Importvorgänge, nicht einzelne Produkte oder Bestellungen."
                    error={validationErrors.importvorgaenge ? "Pflichtfeld" : undefined}
                  >
                    <SelectInput
                      id="importvorgaenge"
                      value={formData.importvorgaenge}
                      onChange={set("importvorgaenge")}
                      placeholder="Bitte wählen"
                      required
                      options={["Unter 50 Vorgänge", "50 – 200 Vorgänge", "200 – 500 Vorgänge", "500 – 1.000 Vorgänge", "Über 1.000 Vorgänge"]}
                    />
                  </Field>
                  <Field
                    label="Geschätztes jährliches Importvolumen"
                    required
                    hint="Eine grobe Schätzung reicht. Das hilft uns einzuschätzen, ob sich ein Leak-Scan wirtschaftlich lohnt."
                    error={validationErrors.importvolumen ? "Pflichtfeld" : undefined}
                  >
                    <SelectInput
                      id="importvolumen"
                      value={formData.importvolumen}
                      onChange={set("importvolumen")}
                      placeholder="Bitte wählen"
                      required
                      options={["Unter 100.000 €", "100.000 – 500.000 €", "500.000 € – 1 Mio. €", "1 – 5 Mio. €", "Über 5 Mio. €"]}
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Hauptherkunftsländer" required error={validationErrors.herkunftslaender ? "Pflichtfeld" : undefined}>
                      <TextInput id="herkunftslaender" placeholder="z. B. China, Türkei" value={formData.herkunftslaender} onChange={set("herkunftslaender")} required />
                      <p className="mt-1 text-xs text-slate-500">z. B. China, Türkei, Vietnam</p>
                    </Field>
                    <Field label="Warengruppen" required error={validationErrors.warengruppen ? "Pflichtfeld" : undefined}>
                      <TextInput id="warengruppen" placeholder="z. B. Elektronikzubehör" value={formData.warengruppen} onChange={set("warengruppen")} required />
                      <p className="mt-1 text-xs text-slate-500">z. B. Elektronik, Ersatzteile</p>
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Zolldienstleister / Spediteur">
                      <TextInput id="zolldienstleister" placeholder="z. B. DHL, Schenker, intern" value={formData.zolldienstleister} onChange={set("zolldienstleister")} />
                    </Field>
                    <Field label="Letzte Zollprüfung / Audit">
                      <SelectInput
                        id="letzteZollpruefung"
                        value={formData.letzteZollpruefung}
                        onChange={set("letzteZollpruefung")}
                        placeholder="Bitte wählen"
                        options={["Noch nie", "Vor mehr als 3 Jahren", "Vor 1–3 Jahren", "Innerhalb des letzten Jahres", "Weiß ich nicht"]}
                      />
                    </Field>
                  </div>
                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      <ChevronLeft className="h-4 w-4" /> Zurück
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                    >
                      Weiter <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Dokumente + Abschluss ── */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <h3 className="text-lg font-semibold" style={{ color: "#0B192C" }}>Dokumente hochladen</h3>
                  <p className="text-sm" style={{ color: "#64748b" }}>
                    Laden Sie 3–10 Beispieldokumente hoch: Zollbescheide, Handelsrechnungen, Packlisten oder Spediteursabrechnungen.{" "}
                    <strong style={{ color: "#334155" }}>Bitte keine vollständigen Jahresarchive.</strong>
                  </p>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.zip,.csv,.xlsx,.xls,.xml,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {/* File picker area */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-3 text-xs font-medium text-slate-500">PDF, ZIP, CSV, XLSX – mehrere Dateien möglich</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
                    >
                      <Paperclip className="h-4 w-4" />
                      Dateien auswählen
                    </button>

                    {selectedFiles.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {selectedFiles.map((file) => (
                          <li
                            key={file.name}
                            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <Paperclip className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                              <span className="truncate font-medium text-slate-700">{file.name}</span>
                              <span className="shrink-0 text-xs text-slate-400">{formatBytes(file.size)}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(file.name)}
                              className="ml-2 shrink-0 rounded p-0.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                              aria-label={`${file.name} entfernen`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700">Anmerkungen (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Gibt es etwas, das wir beim Erstcheck besonders beachten sollen?"
                      value={formData.nachricht}
                      onChange={(e) => setFormData((p) => ({ ...p, nachricht: e.target.value }))}
                      className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1E3A8A] focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                    />
                  </div>

                  {/* Pflicht-Zustimmungen */}
                  <fieldset className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <legend className="px-1 text-sm font-medium text-slate-700">Bitte bestätigen Sie vor dem Absenden</legend>
                    {[
                      { key: "berechtigt" as const, label: "Ich bestätige, dass ich berechtigt bin, diese Dokumente hochzuladen." },
                      { key: "keineBeratung" as const, label: "Ich habe verstanden, dass ZollMetrics eine datenbasierte Voranalyse und keine Rechts-, Steuer- oder Zollberatung anbietet." },
                      {
                        key: "datenschutz" as const,
                        label: (
                          <>
                            Ich stimme der Verarbeitung meiner Angaben und Testdokumente zur Bearbeitung der Anfrage gemäß{" "}
                            <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-[#1E3A8A] underline hover:opacity-80">
                              Datenschutzerklärung
                            </a>{" "}
                            zu.
                          </>
                        ),
                      },
                    ].map((item) => (
                      <label key={item.key} className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={consent[item.key]}
                          onChange={(e) => {
                            setConsent((p) => ({ ...p, [item.key]: e.target.checked }))
                            if (e.target.checked && uploadStatus === "error") {
                              setUploadStatus("idle")
                              setErrorMessage("")
                            }
                          }}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#1E3A8A] accent-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]"
                        />
                        <span className="leading-relaxed">{item.label}</span>
                      </label>
                    ))}
                  </fieldset>

                  {uploadStatus === "error" && (
                    <div className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: "#fecaca", backgroundColor: "#fef2f2", color: "#991b1b" }}>
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      <ChevronLeft className="h-4 w-4" /> Zurück
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold shadow-sm transition-all ${
                        canSubmit
                          ? "bg-[#1E3A8A] text-white hover:opacity-90"
                          : "cursor-not-allowed bg-slate-300 text-slate-500"
                      }`}
                    >
                      {uploadStatus === "uploading" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Wird hochgeladen...
                        </>
                      ) : (
                        "Erstcheck starten"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
