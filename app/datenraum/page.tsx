"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, CircleAlert as AlertCircle, Lock, Paperclip, X } from "lucide-react"
import { uploadFile } from "@uploadcare/upload-client"

type UploadStatus = "idle" | "uploading" | "success" | "error"

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function CustomerPortal() {
  const [companyName, setCompanyName] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canSubmit = companyName.trim().length > 0 && selectedFiles.length > 0 && uploadStatus !== "uploading"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!companyName.trim()) {
      setErrorMessage("Firmenname ist erforderlich.")
      setUploadStatus("error")
      return
    }
    if (selectedFiles.length === 0) {
      setErrorMessage("Mindestens eine Datei ist erforderlich.")
      setUploadStatus("error")
      return
    }
    setUploadStatus("uploading")
    setErrorMessage("")
    try {
      const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY ?? "demopublickey"
      const fileUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          const result = await uploadFile(file, { publicKey, store: "auto" })
          return result.cdnUrl
        })
      )

      const res = await fetch("/api/dashboard-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: companyName.trim(), fileUrls }),
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
      <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#F5F4F2" }}>
        <Navbar />
        <main className="flex-1 py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0B1F3A]">Übertragung erfolgreich</h2>
                <p className="mt-2 text-slate-600">
                  Ihr geschützter Datenraum wurde aktualisiert. Unsere Experten wurden benachrichtigt.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Die Dokumente für <strong className="text-[#0B1F3A]">{companyName}</strong> wurden sicher übermittelt.
                </p>
              </div>
              <Button
                onClick={() => {
                  setUploadStatus("idle")
                  setCompanyName("")
                  setSelectedFiles([])
                  setErrorMessage("")
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
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#F5F4F2" }}>
      <Navbar />
      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="mb-2 flex items-center gap-2">
              <Lock className="h-5 w-5" style={{ color: "#0B1F3A" }} />
              <h1 className="text-3xl font-bold" style={{ color: "#0B1F3A" }}>
                Bestandskunden-Datenraum
              </h1>
            </div>
            <p className="mt-3 text-slate-600">
              Laden Sie Ihre Zollbescheide, Einfuhranmeldungen und weitere Dokumente sicher hoch.
              256-bit SSL-Verschlüsselung – DSGVO-konform – Automatische Löschung nach Projektabschluss
            </p>
          </div>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company" className="font-semibold text-slate-700">
                    Firmenname <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="z.B. Musterfirma GmbH"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value)
                      if (uploadStatus === "error") {
                        setUploadStatus("idle")
                        setErrorMessage("")
                      }
                    }}
                    required
                    className="border-slate-300 bg-white"
                  />
                  <p className="text-xs text-slate-500">
                    Geben Sie den exakten Firmennamen ein, wie er in Ihrem bestehenden Datenraum hinterlegt ist.
                  </p>
                </div>

                {/* File picker */}
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-slate-700">
                    Dateien hochladen <span className="text-red-500">*</span>
                    <span className="ml-1 font-normal text-slate-500">(ZIP, PDF, CSV, Excel, etc.)</span>
                  </Label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.zip,.csv,.xlsx,.xls,.xml,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-[#0B1F3A] hover:text-[#0B1F3A]"
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
                </div>

                {/* Validation hint */}
                {!canSubmit && uploadStatus !== "uploading" && (
                  <p className="text-sm text-slate-500">
                    {!companyName.trim() && selectedFiles.length === 0
                      ? "Bitte geben Sie den Firmennamen ein und laden Sie mindestens eine Datei hoch."
                      : !companyName.trim()
                      ? "Bitte geben Sie den Firmennamen ein."
                      : "Bitte laden Sie mindestens eine Datei hoch."}
                  </p>
                )}

                {/* Error */}
                {uploadStatus === "error" && (
                  <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className={`mt-2 ${canSubmit ? "bg-[#0B1F3A] text-white hover:bg-[#162d54]" : "cursor-not-allowed bg-slate-300 text-slate-500"}`}
                >
                  {uploadStatus === "uploading" ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Wird hochgeladen...
                    </>
                  ) : (
                    "Neue Dokumente einreichen"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="mb-3 font-semibold text-slate-900">Sicherheit & Datenschutz</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "256-bit SSL-Verschlüsselung für alle Übertragungen",
                "DSGVO-konformer Serverstandort in der EU",
                "Ihre Daten werden nach Projektabschluss automatisch gelöscht",
                "Keine Weitergabe an Dritte",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
