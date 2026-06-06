"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, FileText, Check, CircleAlert as AlertCircle, Lock } from "lucide-react"
import { UploadcareUploader, type UploadedFile } from "@/components/uploadcare-uploader"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function CustomerPortal() {
  const [companyName, setCompanyName] = useState("")
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Strict validation: both company name and files are required
  const canSubmit = useMemo(() => {
    const hasCompanyName = companyName.trim().length > 0
    const hasFiles = files.length > 0
    return hasCompanyName && hasFiles && uploadStatus !== "uploading"
  }, [companyName, files, uploadStatus])

  const handleFilesChange = useCallback((uploaded: UploadedFile[]) => {
    setFiles(uploaded)
    setUploadStatus((prev) => (prev === "error" ? "idle" : prev))
    setErrorMessage("")
  }, [])

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

    // Double-check validation before submit
    if (!companyName.trim()) {
      setErrorMessage("Firmenname ist erforderlich.")
      setUploadStatus("error")
      return
    }

    if (files.length === 0) {
      setErrorMessage("Mindestens eine Datei ist erforderlich.")
      setUploadStatus("error")
      return
    }

    setUploadStatus("uploading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/dashboard-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          fileUrls: files.map((f) => f.cdnUrl),
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || "Beim Übermitteln ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.")
      }

      setUploadStatus("success")
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Beim Übermitteln ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
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
                  setFiles([])
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
              256-bit SSL-Verschlüsselung - DSGVO-konform - Automatische Löschung nach Projektabschluss
            </p>
          </div>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Company Name - REQUIRED */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company" className="text-slate-700 font-semibold">
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
                    className={`border-slate-300 bg-white ${!companyName.trim() && uploadStatus === "error" ? "border-red-400 bg-red-50" : ""}`}
                  />
                  <p className="text-xs text-slate-500">
                    Geben Sie den exakten Firmennamen ein, wie er in Ihrem bestehenden Datenraum hinterlegt ist.
                  </p>
                </div>

                {/* File Upload via Uploadcare - REQUIRED */}
                <div className="flex flex-col gap-2">
                  <Label className="text-slate-700 font-semibold">
                    Dateien hochladen <span className="text-red-500">*</span>
                    <span className="font-normal text-slate-500 ml-1">(ZIP, PDF, CSV, Excel, Bilder, etc.)</span>
                  </Label>

                  <UploadcareUploader onFilesChange={handleFilesChange} />

                  {files.length > 0 && (
                    <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-800">
                          {files.length} {files.length === 1 ? "Datei" : "Dateien"} hochgeladen
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {files.map((file, index) => (
                          <li
                            key={file.uuid || index}
                            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                          >
                            <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                            <span className="flex-1 truncate text-slate-700">{file.name}</span>
                            <span className="shrink-0 text-xs text-slate-400">
                              {formatFileSize(file.size)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
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

                {/* Error Message */}
                {uploadStatus === "error" && (
                  <div className="flex items-start gap-2 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Validation hint */}
                {!canSubmit && uploadStatus !== "uploading" && (
                  <div className="text-sm text-slate-500">
                    {!companyName.trim() && !files.length && (
                      <span>Bitte geben Sie den Firmennamen ein und laden Sie mindestens eine Datei hoch.</span>
                    )}
                    {!companyName.trim() && files.length > 0 && (
                      <span>Bitte geben Sie den Firmennamen ein.</span>
                    )}
                    {companyName.trim() && !files.length && (
                      <span>Bitte laden Sie mindestens eine Datei hoch.</span>
                    )}
                  </div>
                )}

                {/* Submit Button - Disabled until validation passes */}
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className={`mt-2 ${
                    canSubmit 
                      ? "bg-[#0B1F3A] text-white hover:bg-[#162d54]" 
                      : "bg-slate-300 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {uploadStatus === "uploading" ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Verbindung zum gesicherten Server-Netzwerk wird verschlüsselt aufgebaut...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Neue Dokumente einreichen
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="mb-3 font-semibold text-slate-900">Sicherheit & Datenschutz</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                256-bit SSL-Verschlüsselung für alle Übertragungen
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                DSGVO-konformer Serverstandort in der EU
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Ihre Daten werden nach Projektabschluss automatisch gelöscht
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Keine Weitergabe an Dritte
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
