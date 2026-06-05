import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

export const config = {
  api: {
    bodyParser: false,
  },
}

async function getDriveClient() {
  // Sanitize private key to fix "error:1E08010C:DECODER routines::unsupported"
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  const privateKey = rawKey
    ? rawKey.replace(/\\n/g, '\n').replace(/^"(.*)"$/, '$1')
    : undefined

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/drive"],
  })
  return google.drive({ version: "v3", auth })
}

async function createFolder(drive: ReturnType<typeof google.drive>, name: string, parentId: string) {
  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    },
    fields: "id",
  })
  return res.data.id!
}

async function uploadFile(
  drive: ReturnType<typeof google.drive>,
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
    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID
    if (!rootFolderId) {
      return NextResponse.json(
        { error: "Der gesicherte Datenraum ist derzeit nicht verfügbar. Bitte kontaktieren Sie Ihren Betreuer." },
        { status: 503 }
      )
    }

    const formData = await req.formData()
    const company = (formData.get("company") as string | null)?.trim()
    const name = (formData.get("name") as string | null)?.trim() ?? ""
    const email = (formData.get("email") as string | null)?.trim() ?? ""
    const message = (formData.get("message") as string | null)?.trim() ?? ""
    const files = formData.getAll("files") as File[]

    if (!company) {
      return NextResponse.json({ error: "Unternehmensname fehlt." }, { status: 400 })
    }

    const drive = await getDriveClient()

    // Create a new folder named after the company (with timestamp to avoid collisions)
    const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ")
    const folderName = `${company} – ${timestamp}`
    const folderId = await createFolder(drive, folderName, rootFolderId)

    // Save a metadata text file with contact details
    const metaContent = [
      `Name: ${name}`,
      `Unternehmen: ${company}`,
      `E-Mail: ${email}`,
      `Nachricht:\n${message}`,
      `Eingegangen: ${new Date().toLocaleString("de-DE")}`,
    ].join("\n")

    const { Readable } = await import("stream")
    await drive.files.create({
      requestBody: {
        name: "kontaktdaten.txt",
        parents: [folderId],
      },
      media: {
        mimeType: "text/plain",
        body: Readable.from(Buffer.from(metaContent, "utf-8")),
      },
    })

    // Upload all files into the folder
    await Promise.all(
      files
        .filter((f) => f.size > 0)
        .map((file) => uploadFile(drive, file, folderId))
    )

    return NextResponse.json({ success: true, folderId })
  } catch (err: unknown) {
    console.error("Secure storage upload error:", err)
    // Professional error message without mentioning internal services
    return NextResponse.json(
      { error: "Fehler bei der Datenübertragung: Der gesicherte Validierungs-Server konnte keine stabile Verbindung aufbauen. Bitte versuchen Sie es in wenigen Minuten erneut oder kontaktieren Sie Ihren Betreuer." },
      { status: 500 }
    )
  }
}
