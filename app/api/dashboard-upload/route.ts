import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n').replace(/^["']|["']$/g, ''),
    },
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'],
  })

  const drive = google.drive({ version: 'v3', auth })
  return drive
}

async function findCompanyFolder(
  drive: Awaited<ReturnType<typeof google.drive>>,
  companyName: string,
  parentFolderId: string
): Promise<string | null> {
  // Search for existing company folder within the root folder
  const query = `mimeType = 'application/vnd.google-apps.folder' and name = '${companyName.replace(/'/g, "\\'")}' and '${parentFolderId}' in parents and trashed = false`
  
  const res = await drive.files.list({
    q: query,
    fields: "files(id, name)",
    pageSize: 1,
  })

  if (res.data.files && res.data.files.length > 0) {
    return res.data.files[0].id!
  }
  return null
}

async function createFolder(
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
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID
    if (!rootFolderId) {
      return NextResponse.json(
        { error: "Der gesicherte Datenraum ist derzeit nicht verfügbar. Bitte kontaktieren Sie Ihren Betreuer." },
        { status: 503 }
      )
    }

    const formData = await req.formData()
    const companyName = (formData.get("companyName") as string | null)?.trim()
    const files = formData.getAll("files") as File[]

    // Strict validation: Both company name and files are required
    if (!companyName) {
      return NextResponse.json(
        { error: "Firmenname ist erforderlich." },
        { status: 400 }
      )
    }

    const validFiles = files.filter((f) => f.size > 0)
    if (validFiles.length === 0) {
      return NextResponse.json(
        { error: "Mindestens eine Datei ist erforderlich." },
        { status: 400 }
      )
    }

    const drive = await getDriveClient()

    // Step A: Search for existing company folder
    let companyFolderId = await findCompanyFolder(drive, companyName, rootFolderId)

    // Step B: If company folder doesn't exist, create it first
    if (!companyFolderId) {
      companyFolderId = await createFolder(drive, companyName, rootFolderId)
    }

    // Step B continued: Create date subfolder (German format: DD.MM.YYYY)
    const now = new Date()
    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()
    const dateStr = `${day}.${month}.${year}`

    const dateFolderId = await createFolder(drive, dateStr, companyFolderId)

    // Step C: Upload all files into the date folder
    await Promise.all(
      validFiles.map((file) => uploadFileToDrive(drive, file, dateFolderId))
    )

    return NextResponse.json({
      success: true,
      companyName,
      dateFolder: dateStr,
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
