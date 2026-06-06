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
    const { companyName, fileUrls } = body

    if (!companyName) {
      return NextResponse.json({ error: "Firmenname ist erforderlich." }, { status: 400 })
    }

    if (!fileUrls || fileUrls.length === 0) {
      return NextResponse.json({ error: "Mindestens eine Datei ist erforderlich." }, { status: 400 })
    }

    const supabase = getSupabase()
    const { error } = await supabase.from("form_submissions").insert({
      unternehmen: companyName,
      email: "bestandskunde@upload",
      file_urls: fileUrls,
      source: "datenraum",
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Speicherfehler. Bitte erneut versuchen." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("dashboard-upload route error:", err)
    return NextResponse.json({ error: "Interner Fehler." }, { status: 500 })
  }
}
