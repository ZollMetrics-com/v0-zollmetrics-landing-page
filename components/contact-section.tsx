"use client"

import { useState, useRef, useCallback } from "react"
import { Check, Upload, X, FileText, CircleAlert as AlertCircle, ChevronRight, ChevronLeft } from "lucide-react"

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

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ContactSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(EMPTY)
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({})

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  const set = (key: keyof FormData) => (v: string) => {
    setFormData((p) => ({ ...p, [key]: v }))
    if (v) setValidationErrors((p) => ({ ...p, [key]: false }))
  }

  // ── File handlers ──

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size))
      return [...prev, ...newFiles.filter((f) => !existing.has(f.name + f.size))]
    })
    setUploadStatus("idle")
    setErrorMessage("")
  }, [])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList)
      addFiles(filesArray)
    }
    e.target.value = ""
  }, [addFiles])

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation()
    dragCounter.current++
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) setDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation()
    dragCounter.current = 0
    setDragActive(false)
    if (e.dataTransfer.files?.length) {
      addFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, j) => j !== index))
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  // ── Step navigation with validation ──

  const step1Fields = ["vorname", "nachname", "email", "unternehmen"] as const

  const validateStep1 = () => {
    const errors: Record<string, boolean> = {}
    let valid = true
    for (const key of step1Fields) {
      if (!formData[key]) {
        errors[key] = true
        valid = false
      }
    }
    setValidationErrors((p) => ({ ...p, ...errors }))
    return valid
  }

  const step2Fields = ["importvorgaenge", "importvolumen", "herkunftslaender", "warengruppen"] as const

  const validateStep2 = () => {
    const errors: Record<string, boolean> = {}
    let valid = true
    for (const key of step2Fields) {
      if (!formData[key]) {
        errors[key] = true
        valid = false
      }
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

  // ── Submit ──

  const canSubmit = files.length > 0 && !!formData.unternehmen && uploadStatus !== "uploading"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) {
      setErrorMessage("Bitte laden Sie mindestens ein Dokument hoch.")
      setUploadStatus("error")
      return
    }
    if (!formData.unternehmen) {
      setErrorMessage("Unternehmensname fehlt. Bitte gehen Sie zurück zu Schritt 1.")
      setUploadStatus("error")
      return
    }
    setUploadStatus("uploading")
    setErrorMessage("")
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([k, v]) => data.append(k, v))
      files.forEach((f) => data.append("files", f))
      const res = await fetch("/api/upload-to-drive", { method: "POST", body: data })
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

  // ── Success view ──

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
                Ihr geschützter Datenraum <strong style={{ color: "#0B192C" }}>{formData.unternehmen}</strong> wurde angelegt.
                Ihre Potenzialeinschätzung wird vorbereitet.
              </p>
              <p className="mt-3 text-sm" style={{ color: "#64748b" }}>
                Wir prüfen Ihre Dokumente und melden uns innerhalb von 1–2 Werktagen.
              </p>
            </div>
            <button
              onClick={() => { setUploadStatus("idle"); setStep(1); setFormData(EMPTY); setFiles([]); setValidationErrors({}) }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Weitere Anfrage senden
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ── Main form ──

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
            {/* Hidden file input lives OUTSIDE the clickable drop zone */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileInputChange}
            />

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
                    error={validationErrors.importvolumen ? "Pflichtfeld" : undefined}
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
                    Laden Sie 3–10 Beispieldokumente hoch: Zollbescheide, Handelsrechnungen, Packlisten oder Spediteursabrechnungen. <strong style={{ color: "#334155" }}>Bitte keine vollständigen Jahresarchive.</strong>
                  </p>

                  {/* Drag & drop zone — no input inside to avoid click event conflicts */}
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={openFilePicker}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
                      dragActive
                        ? "border-[#1E3A8A] bg-blue-50"
                        : files.length > 0
                        ? "border-[#16a34a] bg-green-50"
                        : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-white"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef3fc]">
                      <Upload className={`h-6 w-6 ${dragActive ? "text-[#1E3A8A]" : "text-slate-400"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Dateien hierher ziehen oder{" "}
                        <span className="underline underline-offset-2" style={{ color: "#1E3A8A" }}>auswählen</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">PDF, ZIP, CSV, XLSX – mehrere Dateien möglich</p>
                    </div>
                  </div>

                  {/* File list */}
                  {files.length > 0 && (
                    <div className="rounded-xl border p-4" style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}>
                      <div className="mb-2 flex items-center gap-2">
                        <Check className="h-4 w-4" style={{ color: "#16a34a" }} />
                        <span className="text-sm font-medium" style={{ color: "#14532d" }}>
                          {files.length} {files.length === 1 ? "Datei" : "Dateien"} ausgewählt
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {files.map((file, i) => (
                          <li key={`${file.name}-${file.size}-${i}`} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                            <FileText className="h-4 w-4 shrink-0" style={{ color: "#1E3A8A" }} />
                            <span className="flex-1 truncate text-slate-700">{file.name}</span>
                            <span className="shrink-0 text-xs text-slate-500">{formatFileSize(file.size)}</span>
                            <button type="button" onClick={() => removeFile(i)} className="shrink-0 text-slate-400 transition-colors hover:text-red-500">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

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
                          : "bg-slate-300 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {uploadStatus === "uploading" ? (
                        <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sicherer Upload-Kanal wird verschlüsselt aufgebaut...</>
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
