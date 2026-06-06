import { NextResponse } from "next/server"

/**
 * Bestandskunden-Datenraum upload.
 * Receives Uploadcare CDN file URLs plus the company name. Files are uploaded
 * client-side directly to Uploadcare; this route records the URLs only.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 })
    }

    const { companyName = "", fileUrls = [] } = body as {
      companyName?: string
      fileUrls?: string[]
    }

    const company = companyName.trim()

    if (!company) {
      return NextResponse.json(
        { error: "Firmenname ist erforderlich." },
        { status: 400 },
      )
    }

    if (!Array.isArray(fileUrls) || fileUrls.length === 0) {
      return NextResponse.json(
        { error: "Mindestens eine Datei ist erforderlich." },
        { status: 400 },
      )
    }

    const today = new Date().toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

    const summary = [
      `=== Bestandskunden-Upload ===`,
      `Eingang: ${new Date().toLocaleString("de-DE")}`,
      `Datenraum: ${company} - ${today}`,
      ``,
      `--- Dokumente (${fileUrls.length}) ---`,
      ...fileUrls.map((url, i) => `${i + 1}. ${url}`),
    ].join("\n")

    console.log("[v0] Bestandskunden-Upload:\n" + summary)

    return NextResponse.json({
      success: true,
      company,
      fileCount: fileUrls.length,
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error("[v0] Dashboard upload error:", errorMessage)
    return NextResponse.json(
      { error: "Beim Übermitteln ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 },
    )
  }
}
