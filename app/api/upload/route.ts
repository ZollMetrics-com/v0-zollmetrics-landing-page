import { NextResponse } from 'next/server'
import { google } from 'googleapis'

function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  })
  return google.drive({ version: 'v3', auth })
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const companyName = formData.get('companyName') as string || 'Unbekanntes Unternehmen'
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Keine Dateien gefunden' }, { status: 400 })
    }

    const drive = getDriveClient()

    const today = new Date().toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

    const folderName = `${companyName} - ${today}`

    const folderResponse = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID || ''],
      },
      fields: 'id',
    })

    const subfolderId = folderResponse.data.id

    if (!subfolderId) {
      throw new Error('Ordner-Erstellung fehlgeschlagen')
    }

    for (const file of files) {
      const { Readable } = await import('stream')
      const buffer = Buffer.from(await file.arrayBuffer())

      await drive.files.create({
        requestBody: {
          name: file.name,
          parents: [subfolderId],
        },
        media: {
          mimeType: file.type || 'application/octet-stream',
          body: Readable.from(buffer),
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Interner Serverfehler:', errorMessage)
    return NextResponse.json(
      { error: 'Fehler bei der Datenübertragung: Der gesicherte Validierungs-Server konnte keine stabile Verbindung aufbauen.' },
      { status: 500 }
    )
  }
}
