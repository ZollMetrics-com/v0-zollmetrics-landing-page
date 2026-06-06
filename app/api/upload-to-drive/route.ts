import { NextResponse } from "next/server"

/**
 * Receives the Uploadcare CDN file URLs together with the contact form fields.
 * Files are uploaded client-side directly to Uploadcare, so this route no
 * longer handles any file streams or external storage credentials.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Ungültige Anfrage." },
        { status: 400 },
      )
    }

    const { fields = {}, fileUrls = [] } = body as {
      fields?: Record<string, string>
      fileUrls?: string[]
    }

    const company = (fields.unternehmen ?? "").trim()
    const email = (fields.email ?? "").trim()

    if (!company || !email) {
      return NextResponse.json(
        { error: "Unternehmensname und E-Mail sind erforderlich." },
        { status: 400 },
      )
    }

    if (!Array.isArray(fileUrls) || fileUrls.length === 0) {
      return NextResponse.json(
        { error: "Bitte laden Sie mindestens ein Dokument hoch." },
        { status: 400 },
      )
    }

    // Plain-text notification payload (visible in Vercel logs).
    const summary = [
      `=== Neue Erstcheck-Anfrage ===`,
      `Eingang: ${new Date().toLocaleString("de-DE")}`,
      ``,
      `--- Kontaktdaten ---`,
      `Name: ${fields.vorname ?? ""} ${fields.nachname ?? ""}`.trim(),
      `Unternehmen: ${company}`,
      `E-Mail: ${email}`,
      fields.website ? `Website: ${fields.website}` : null,
      fields.rolle ? `Rolle: ${fields.rolle}` : null,
      ``,
      `--- Importdaten ---`,
      `Importvorgänge/Jahr: ${fields.importvorgaenge ?? ""}`,
      `Importvolumen: ${fields.importvolumen ?? ""}`,
      `Herkunftsländer: ${fields.herkunftslaender ?? ""}`,
      `Warengruppen: ${fields.warengruppen ?? ""}`,
      fields.zolldienstleister ? `Zolldienstleister: ${fields.zolldienstleister}` : null,
      fields.letzteZollpruefung ? `Letzte Zollprüfung: ${fields.letzteZollpruefung}` : null,
      ``,
      `--- Anmerkungen ---`,
      fields.nachricht || "(keine)",
      ``,
      `--- Dokumente (${fileUrls.length}) ---`,
      ...fileUrls.map((url, i) => `${i + 1}. ${url}`),
    ]
      .filter((line) => line !== null)
      .join("\n")

    console.log("[v0] Neue Erstcheck-Anfrage:\n" + summary)

    return NextResponse.json({
      success: true,
      company,
      fileCount: fileUrls.length,
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error("[v0] Erstcheck submission error:", errorMessage)
    return NextResponse.json(
      { error: "Beim Übermitteln ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 },
    )
  }
}
