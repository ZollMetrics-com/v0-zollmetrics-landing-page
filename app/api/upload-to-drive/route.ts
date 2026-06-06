import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      vorname, nachname, email, unternehmen, website, rolle,
      importvorgaenge, importvolumen, herkunftslaender, warengruppen,
      zolldienstleister, letzteZollpruefung, nachricht, fileUrls,
    } = body

    if (!email || !unternehmen) {
      return NextResponse.json(
        { error: "Unternehmensname und E-Mail sind erforderlich." },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    const { error } = await supabase.from("form_submissions").insert({
      vorname,
      nachname,
      email,
      unternehmen,
      website,
      rolle,
      importvorgaenge,
      importvolumen,
      herkunftslaender,
      warengruppen,
      zolldienstleister,
      letzte_zollpruefung: letzteZollpruefung,
      nachricht,
      file_urls: fileUrls ?? [],
      source: "landing",
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Speicherfehler. Bitte erneut versuchen." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("upload-to-drive route error:", err)
    return NextResponse.json({ error: "Interner Fehler." }, { status: 500 })
  }
}
