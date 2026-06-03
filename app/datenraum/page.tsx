"use client"

import { useState, useRef, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, X, FileText, Check, CircleAlert as AlertCircle, Lock } from "lucide-react"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function CustomerPortal() {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    message: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size))
      const filtered = Array.from(newFiles).filter(
        (f) => !existing.has(f.name + f.size)
      )
      return [...prev, ...filtered]
    })
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files)
    e.target.value = ""
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
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
      data.append("company", formData.company)
      data.append("name", formData.contact)
      data.append("email", formData.email)
      data.append("message", formData.message)
      files.forEach((file) => data.append("files", file))

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || "Upload fehlgeschlagen")
      }

      setUploadStatus("success")
      setFormData({ company: "", contact: "", email: "", message: "" })
      setFiles([])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unbekannter Fehler"
      setErrorMessage(message)
      setUploadStatus("error")
    }
  }

  if (uploadStatus === "success") {
    return (
      <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#F5F4F2' }}>
        <Navbar />
        <main className="flex-1 py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">Vielen Dank!</h2>
                <p className="mt-2 text-slate-600">
                  Ihre Daten für {formData.company} wurden erfolgreich übermittelt. Wir bearbeiten Ihre Dateien und melden uns schnellstmöglich bei Ihnen.
                </p>
              </div>
              <Button
                onClick={() => {
                  setUploadStatus("idle")
                  setFormData({ company: "", contact: "", email: "", message: "" })
                }}
                className="bg-[#0B1F3A] text-white hover:bg-[#162d54]"
              >
                Weitere Dateien hochladen
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#F5F4F2' }}>
      <Navbar />
      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="mb-2 flex items-center gap-2">
              <Lock className="h-5 w-5" style={{ color: '#0B1F3A' }} />
              <h1 className="text-3xl font-bold" style={{ color: '#0B1F3A' }}>
                Bestandskunden-Datenraum
              </h1>
            </div>
            <p className="mt-3 text-slate-600">
              Laden Sie Ihre Zollbescheide, Einfuhranmeldungen und weitere Dokumente sicher hoch.
              256-bit SSL-Verschlüsselung • DSGVO-konform • Automatische Löschung nach Projektabschluss
            </p>
          </div>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="company" className="text-slate-700 font-semibold">Unternehmensname *</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="z.B. Musterfirma GmbH"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      className="border-slate-300 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact" className="text-slate-700 font-semibold">Kontaktperson</Label>
                    <Input
                      id="contact"
                      type="text"
                      placeholder="Ihr Name"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-slate-700 font-semibold">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-slate-300 bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-slate-700 font-semibold">
                    Notiz <span className="font-normal text-slate-500">(optional)</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="z.B. Betrifft Zollperiode 2024 oder spezifische Artikel..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-slate-300 bg-white"
                  />
                </div>

                {/* Drag & Drop Upload */}
                <div className="flex flex-col gap-2">
                  <Label className="text-slate-700 font-semibold">
                    Dateien hochladen <span className="font-normal text-slate-500">(ZIP, PDF, CSV, Excel, Bilder, etc.)</span>
                  </Label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                      flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-4 py-10 text-center transition-colors
                      ${dragActive
                        ? "border-[#0B1F3A] bg-[#0B1F3A]/5"
                        : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100"
                      }
                    `}
                  >
                    <Upload className={`h-8 w-8 ${dragActive ? "text-[#0B1F3A]" : "text-slate-400"}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Dateien hier ablegen oder{" "}
                        <span className="text-[#0B1F3A] underline underline-offset-2">auswählen</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Mehrere Dateien, auch große ZIP-Archive und Datenbank-Exporte möglich
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="mt-2">
                      <p className="mb-2 text-sm font-medium text-slate-700">{files.length} Datei(en) ausgewählt:</p>
                      <ul className="flex flex-col gap-1.5">
                        {files.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                          >
                            <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                            <span className="flex-1 truncate text-slate-700">{file.name}</span>
                            <span className="shrink-0 text-xs text-slate-400">
                              {formatFileSize(file.size)}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeFile(index) }}
                              className="shrink-0 rounded-sm text-slate-400 transition-colors hover:text-red-500"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {uploadStatus === "error" && (
                  <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={uploadStatus === "uploading"}
                  className="mt-2 bg-[#0B1F3A] text-white hover:bg-[#162d54] disabled:opacity-60"
                >
                  {uploadStatus === "uploading" ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Wird hochgeladen...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Dateien hochladen
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="mb-3 font-semibold text-slate-900">Sicherheit & Datenschutz</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ 256-bit SSL-Verschlüsselung für alle Übertragungen</li>
              <li>✓ DSGVO-konformer Serverstandort in der EU</li>
              <li>✓ Ihre Daten werden nach Projektabschluss automatisch gelöscht</li>
              <li>✓ Keine Weitergabe an Dritte</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
