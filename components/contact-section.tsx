"use client"

import { useState, useRef, useCallback } from "react"
import { Check, Upload, X, FileText, CircleAlert as AlertCircle, ChevronRight, ChevronLeft } from "lucide-react"

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface FormData {
  // Step 1 – Kontakt
  vorname: string
  nachname: string
  email: string
  unternehmen: string
  website: string
  rolle: string
  // Step 2 – Importdaten
  importvorgaenge: string
  importvolumen: string
  herkunftslaender: string
  warengruppen: string
  zolldienstleister: string
  letzteZollpruefung: string
  // Step 3 – Upload + Abschluss
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

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s.number} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                s.number < current
                  ? "bg-[#1a4fa8] text-white"
                  : s.number === current
                  ? "bg-[#1a4fa8] text-white shadow-md"
                  : "border border-slate-300 bg-white text-slate-400"
              }`}
            >
              {s.number < current ? <Check className="h-4 w-4" /> : s.number}
            </div>
            <span
              className={`text-xs font-medium ${
                s.number === current ? "text-[#1a4fa8]" : s.number < current ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`mb-5 h-0.5 w-16 transition-colors sm:w-24 ${
                s.number < current ? "bg-[#1a4fa8]" : "bg-slate-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function Field({
  label, required, hint, children,
}: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}{required && <span className="ml-0.5 text-[#1a4fa8]"> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#1a4fa8]">{hint}</p>}
    </div>
  )
}

function TextInput({
  id, placeholder, value, onChange, type = "text", required,
}: {
  id: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-[#1a4fa8] focus:outline-none focus:ring-1 focus:ring-[#1a4fa8]"
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
      className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-[#1a4fa8] focus:outline-none focus:ring-1 focus:ring-[#1a4fa8]"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export function ContactSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(EMPTY)
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof FormData) => (v: string) => setFormData((p) => ({ ...p, [key]: v }))

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size))
      return [...prev, ...Array.from(newFiles).filter((f) => !existing.has(f.name + f.size))]
    })
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploadStatus("uploading")
    setErrorMessage("")
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([k, v]) => data.append(k, v))
      files.forEach((f) => data.append("files", f))
      const res = await fetch("/api/upload", { method: "POST", body: data })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || "Upload fehlgeschlagen")
      }
      setUploadStatus("success")
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Unbekannter Fehler")
      setUploadStatus("error")
    }
  }

  if (uploadStatus === "success") {
    return (
      <section id="scan" className="border-t py-16 md:py-24" style={{ backgroundColor: "#f8fafc", borderTopColor: "#e2e8f0" }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col items-center gap-6 rounded-2xl border p-12 text-center shadow-sm"
            style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
              <Check className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Vielen Dank, {formData.vorname}!</h3>
              <p className="mt-2 text-slate-400">
                Ihre Anfrage wurde erfolgreich übermittelt. Wir prüfen Ihre Dokumente und melden uns innerhalb von 1–2 Werktagen.
              </p>
            </div>
            <button
              onClick={() => { setUploadStatus("idle"); setStep(1); setFormData(EMPTY); setFiles([]) }}
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
    <section id="scan" className="border-t py-16 md:py-24" style={{ backgroundColor: "#f8fafc", borderTopColor: "#e2e8f0" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#1a4fa8" }}>
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
          {/* Step indicator */}
          <div className="flex justify-center">
            <StepIndicator current={step} />
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl border p-8 shadow-sm"
            style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
          >
            <form onSubmit={handleSubmit}>

              {/* ── STEP 1: Kontakt ── */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <h3 className="text-lg font-semibold" style={{ color: "#0B192C" }}>Ihre Kontaktdaten</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Vorname" required>
                      <TextInput id="vorname" placeholder="Max" value={formData.vorname} onChange={set("vorname")} required />
                    </Field>
                    <Field label="Nachname" required>
                      <TextInput id="nachname" placeholder="Mustermann" value={formData.nachname} onChange={set("nachname")} required />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Geschäftliche E-Mail" required>
                      <TextInput id="email" type="email" placeholder="max@unternehmen.de" value={formData.email} onChange={set("email")} required />
                    </Field>
                    <Field label="Unternehmen" required>
                      <TextInput id="unternehmen" placeholder="Muster GmbH" value={formData.unternehmen} onChange={set("unternehmen")} required />
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
                      onClick={() => { if (formData.vorname && formData.nachname && formData.email && formData.unternehmen) setStep(2) }}
                      className="flex items-center gap-2 rounded-lg bg-[#1a4fa8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
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
                  >
                    <SelectInput
                      id="importvorgaenge"
                      value={formData.importvorgaenge}
                      onChange={set("importvorgaenge")}
                      placeholder="Bitte wählen"
                      required
                      options={[
                        "Unter 50 Vorgänge",
                        "50 – 200 Vorgänge",
                        "200 – 500 Vorgänge",
                        "500 – 1.000 Vorgänge",
                        "Über 1.000 Vorgänge",
                      ]}
                    />
                  </Field>
                  <Field
                    label="Geschätztes jährliches Importvolumen"
                    required
                    hint="Eine grobe Schätzung reicht. Das hilft uns einzuschätzen, ob sich ein Leak-Scan wirtschaftlich lohnt."
                  >
                    <SelectInput
                      id="importvolumen"
                      value={formData.importvolumen}
                      onChange={set("importvolumen")}
                      placeholder="Bitte wählen"
                      required
                      options={[
                        "Unter 100.000 €",
                        "100.000 – 500.000 €",
                        "500.000 € – 1 Mio. €",
                        "1 – 5 Mio. €",
                        "Über 5 Mio. €",
                      ]}
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Hauptherkunftsländer" required>
                      <TextInput id="herkunftslaender" placeholder="z. B. China, Türkei" value={formData.herkunftslaender} onChange={set("herkunftslaender")} required />
                      <p className="mt-1 text-xs text-slate-500">z. B. China, Türkei, Vietnam</p>
                    </Field>
                    <Field label="Warengruppen" required>
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
                        options={[
                          "Noch nie",
                          "Vor mehr als 3 Jahren",
                          "Vor 1–3 Jahren",
                          "Innerhalb des letzten Jahres",
                          "Weiß ich nicht",
                        ]}
                      />
                    </Field>
                  </div>
                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      <ChevronLeft className="h-4 w-4" /> Zurück
                    </button>
                    <button
                      type="button"
                      onClick={() => { if (formData.importvorgaenge && formData.importvolumen && formData.herkunftslaender && formData.warengruppen) setStep(3) }}
                      className="flex items-center gap-2 rounded-lg bg-[#1a4fa8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
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
                    Laden Sie 3–10 Beispieldokumente hoch: Zollbescheide, Handelsrechnungen, Packlisten oder Spediteursabrechnungen. <strong style={{ color: "#334155" }}>Bitte keine vollständigen Jahresarchive.</strong>
                  </p>

                  {/* Drag & drop zone */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
                      dragActive
                        ? "border-[#1a4fa8] bg-blue-50"
                        : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-white"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef3fc]">
                      <Upload className={`h-6 w-6 ${dragActive ? "text-[#1a4fa8]" : "text-slate-400"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Dateien hierher ziehen oder{" "}
                        <span className="underline underline-offset-2" style={{ color: "#1a4fa8" }}>auswählen</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">PDF, ZIP, CSV, XLSX – mehrere Dateien möglich</p>
                    </div>
                    <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) { addFiles(e.target.files); e.target.value = "" } }} />
                  </div>

                  {files.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {files.map((file, i) => (
                        <li key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                          <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                          <span className="flex-1 truncate text-slate-700">{file.name}</span>
                          <span className="shrink-0 text-xs text-slate-500">{formatFileSize(file.size)}</span>
                          <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} className="shrink-0 text-slate-500 hover:text-red-400">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700">Anmerkungen (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Gibt es etwas, das wir beim Erstcheck besonders beachten sollen?"
                      value={formData.nachricht}
                      onChange={(e) => setFormData((p) => ({ ...p, nachricht: e.target.value }))}
                      className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1a4fa8] focus:outline-none focus:ring-1 focus:ring-[#1a4fa8]"
                    />
                  </div>

                  {uploadStatus === "error" && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      <ChevronLeft className="h-4 w-4" /> Zurück
                    </button>
                    <button
                      type="submit"
                      disabled={uploadStatus === "uploading"}
                      className="flex items-center gap-2 rounded-lg bg-[#1a4fa8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {uploadStatus === "uploading" ? (
                        <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Wird gesendet...</>
                      ) : (
                        <><Upload className="h-4 w-4" /> Erstcheck starten</>
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
