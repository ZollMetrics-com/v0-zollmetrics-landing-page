"use client"

import { useCallback } from "react"
import { FileUploaderRegular } from "@uploadcare/react-uploader"
import "@uploadcare/react-uploader/core.css"

export interface UploadedFile {
  uuid: string
  name: string
  size: number
  cdnUrl: string
}

interface UploadcareUploaderProps {
  onFilesChange: (files: UploadedFile[]) => void
}

/**
 * Modern Uploadcare uploader (React 19 / Next 16 compatible).
 * Replaces the deprecated @uploadcare/react-widget.
 * Files upload directly to Uploadcare from the browser; we collect the
 * resulting CDN URLs and hand them back to the parent form.
 */
export function UploadcareUploader({ onFilesChange }: UploadcareUploaderProps) {
  const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY

  const handleChange = useCallback(
    (event: { allEntries: Array<{ status: string; uuid?: string | null; name?: string | null; size?: number | null; cdnUrl?: string | null }> }) => {
      const successful = event.allEntries
        .filter((entry) => entry.status === "success" && entry.cdnUrl)
        .map((entry) => ({
          uuid: entry.uuid ?? "",
          name: entry.name ?? "Datei",
          size: entry.size ?? 0,
          cdnUrl: entry.cdnUrl as string,
        }))
      onFilesChange(successful)
    },
    [onFilesChange],
  )

  if (!publicKey) {
    return (
      <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Der Upload-Dienst ist noch nicht konfiguriert. Bitte hinterlegen Sie den
        öffentlichen Schlüssel (NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY).
      </div>
    )
  }

  return (
    <FileUploaderRegular
      pubkey={publicKey}
      multiple
      sourceList="local, url, dropbox, gdrive"
      classNameUploader="uc-light"
      onChange={handleChange}
    />
  )
}
