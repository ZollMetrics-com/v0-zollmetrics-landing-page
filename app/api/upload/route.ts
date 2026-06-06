import { NextResponse } from "next/server"

/**
 * Receives Uploadcare CDN file URLs plus optional contact fields.
 * Files are uploaded client-side directly to Uploadcare; this route only
 * records the resulting URLs and metadata.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 })
    }

    const { fields = {}, fileUrls = [] } = body as {
      fields?: Record<string, string>
      fileUrls?: string[]
    }

    if (!Array.isArray(fileUrls) || fileUrls.length === 0) {
      return NextResponse.json(
        { error: "Bitte laden Sie mindestens ein Dokument hoch." },
        { status: 400 },
      )
    }

    const summary = [
      `=== Neue Datei-Übermittlung ===`,
      `Eingang: ${new Date().toLocaleString("de-DE")}`,
      `Unternehmen: ${fields.companyName ?? fields.unternehmen ?? "(unbekannt)"}`,
      ``,
      `--- Dokumente (${fileUrls.length}) ---`,
      ...fileUrls.map((url, i) => `${i + 1}. ${url}`),
    ].join("\n")

    console.log("[v0] Neue Datei-Übermittlung:\n" + summary)

    return NextResponse.json({ success: true, fileCount: fileUrls.length })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error("[v0] Upload submission error:", errorMessage)
    return NextResponse.json(
      { error: "Beim Übermitteln ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 },
    )
  }
}
