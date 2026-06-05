import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n').replace(/^["']|["']$/g, ''),
    },
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'],
  })

  const drive = google.drive({ version: 'v3', auth })
  return drive
}

async function createSubfolder(
  drive: Awaited<ReturnType<typeof google.drive>>,
  folderName: string,
  parentFolderId: string
) {
  const res = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
    },
    fields: "id",
  })
  return res.data.id!
}

async function uploadFileToDrive(
  drive: Awaited<ReturnType<typeof google.drive>>,
  file: File,
  folderId: string
) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { Readable } = await import("stream")
  const stream = Readable.from(buffer)

  await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [folderId],
    },
    media: {
      mimeType: file.type || "application/octet-stream",
      body: stream,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID
    if (!rootFolderId) {
      return NextResponse.json(
        { error: "Der gesicherte Datenraum ist derzeit nicht verfügbar. Bitte kontaktieren Sie Ihren Betreuer." },
        { status: 503 }
      )
    }

    const formData = await req.formData()

    // Extract all form fields
    const company = (formData.get("unternehmen") as string | null)?.trim()
    const vorname = (formData.get("vorname") as string | null)?.trim() ?? ""
    const nachname = (formData.get("nachname") as string | null)?.trim() ?? ""
    const email = (formData.get("email") as string | null)?.trim() ?? ""
    const website = (formData.get("website") as string | null)?.trim() ?? ""
    const rolle = (formData.get("rolle") as string | null)?.trim() ?? ""
    const importvorgaenge = (formData.get("importvorgaenge") as string | null)?.trim() ?? ""
    const importvolumen = (formData.get("importvolumen") as string | null)?.trim() ?? ""
    const herkunftslaender = (formData.get("herkunftslaender") as string | null)?.trim() ?? ""
    const warengruppen = (formData.get("warengruppen") as string | null)?.trim() ?? ""
    const zolldienstleister = (formData.get("zolldienstleister") as string | null)?.trim() ?? ""
    const letzteZollpruefung = (formData.get("letzteZollpruefung") as string | null)?.trim() ?? ""
    const nachricht = (formData.get("nachricht") as string | null)?.trim() ?? ""
    const files = formData.getAll("files") as File[]

    if (!company || !email) {
      return NextResponse.json(
        { error: "Unternehmensname und E-Mail sind erforderlich." },
        { status: 400 }
      )
    }

    const drive = await getDriveClient()

    // Create subfolder: "Unternehmensname - DD.MM.YYYY"
    const now = new Date()
    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()
    const dateStr = `${day}.${month}.${year}`
    const subfolderName = `${company} - ${dateStr}`
    const subfolderId = await createSubfolder(drive, subfolderName, rootFolderId)

    // Save contact + import metadata as a text file in the subfolder
    const metaContent = [
      `Eingang: ${now.toLocaleString("de-DE")}`,
      ``,
      `--- Kontaktdaten ---`,
      `Name: ${vorname} ${nachname}`,
      `Unternehmen: ${company}`,
      `E-Mail: ${email}`,
      website ? `Website: ${website}` : null,
      rolle ? `Rolle: ${rolle}` : null,
      ``,
      `--- Importdaten ---`,
      `Importvorgänge/Jahr: ${importvorgaenge}`,
      `Importvolumen: ${importvolumen}`,
      `Herkunftsländer: ${herkunftslaender}`,
      `Warengruppen: ${warengruppen}`,
      zolldienstleister ? `Zolldienstleister: ${zolldienstleister}` : null,
      letzteZollpruefung ? `Letzte Zollprüfung: ${letzteZollpruefung}` : null,
      ``,
      `--- Anmerkungen ---`,
      nachricht || "(keine)",
    ]
      .filter(Boolean)
      .join("\n")

    const { Readable } = await import("stream")
    await drive.files.create({
      requestBody: {
        name: "kontaktdaten.txt",
        parents: [subfolderId],
      },
      media: {
        mimeType: "text/plain",
        body: Readable.from(Buffer.from(metaContent, "utf-8")),
      },
    })

    // Upload all document files into the subfolder
    const validFiles = files.filter((f) => f.size > 0)
    await Promise.all(
      validFiles.map((file) => uploadFileToDrive(drive, file, subfolderId))
    )

    return NextResponse.json({
      success: true,
      folderName: subfolderName,
      fileCount: validFiles.length,
    })
  } catch (err: unknown) {
    // Log full error details for Vercel debugging
    const errorMessage = err instanceof Error ? err.message : String(err)
    const errorStack = err instanceof Error ? err.stack : undefined
    console.error("Secure storage upload error:", { message: errorMessage, stack: errorStack, raw: err })
    
    // Professional error message without mentioning internal services
    return NextResponse.json(
      { error: "Fehler bei der Datenübertragung: Der gesicherte Validierungs-Server konnte keine stabile Verbindung aufbauen. Bitte versuchen Sie es in wenigen Minuten erneut oder kontaktieren Sie Ihren Betreuer." },
      { status: 500 }
    )
  }
}
