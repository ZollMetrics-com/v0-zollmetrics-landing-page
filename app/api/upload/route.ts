import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const companyName = formData.get('companyName') as string || 'Unbekanntes Unternehmen';
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Keine Dateien gefunden' }, { status: 400 });
    }

    // Absolut sichere Google-Authentifizierung direkt über das credentials-Objekt
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n').replace(/^["']|["']$/g, ''),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // 1. Heutiges Datum im deutschen Format holen
    const today = new Date().toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // 2. Neuen Unterordner-Namen generieren
    const folderName = `${companyName} - ${today}`;

    // 3. Unterordner in Google Drive erstellen
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID || ''],
    };

    const folderResponse = await drive.files.create({
      requestBody: folderMetadata,
      fields: 'id',
    });

    const subfolderId = folderResponse.data.id;

    if (!subfolderId) {
      throw new Error('Ordner-Erstellung fehlgeschlagen');
    }

    // 4. Alle Dateien in diesen neuen Unterordner hochladen
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      await drive.files.create({
        requestBody: {
          name: file.name,
          parents: [subfolderId],
        },
        media: {
          mimeType: file.type,
          body: require('stream').Readable.from(buffer),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Interner Serverfehler:', error.message);
    return NextResponse.json(
      { error: 'Fehler bei der Datenübertragung: Der gesicherte Validierungs-Server konnte keine stabile Verbindung aufbauen.' },
      { status: 500 }
    );
  }
}