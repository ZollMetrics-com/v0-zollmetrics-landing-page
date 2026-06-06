import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface UploadedFile {
  name: string
  cdnUrl: string
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function buildEmailHtml(body: {
  vorname: string; nachname: string; email: string; unternehmen: string
  website: string; rolle: string; importvorgaenge: string; importvolumen: string
  herkunftslaender: string; warengruppen: string; zolldienstleister: string
  letzteZollpruefung: string; nachricht: string; files: UploadedFile[]
}): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;width:200px;vertical-align:top">${label}</td><td style="padding:6px 12px;color:#0f172a;font-size:13px">${value}</td></tr>`
      : ""

  const fileLinks = body.files.length
    ? body.files
        .map(
          (f) =>
            `<li style="margin:4px 0"><a href="${f.cdnUrl}" style="color:#1E3A8A;text-decoration:underline">${f.name}</a></li>`
        )
        .join("")
    : "<li style='color:#64748b'>Keine Dateien</li>"

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">

        <!-- Header -->
        <tr><td style="background:#0B1F3A;padding:24px 32px">
          <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700">ZollMetrics</p>
          <p style="margin:4px 0 0;color:#93c5fd;font-size:13px">Neuer Erstcheck eingegangen</p>
        </td></tr>

        <!-- Subject line -->
        <tr><td style="padding:24px 32px 0">
          <h1 style="margin:0;font-size:18px;color:#0f172a">Neuer Erstcheck: ${body.unternehmen}</h1>
        </td></tr>

        <!-- Kontaktdaten -->
        <tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8">Kontaktdaten</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
            ${row("Vorname", body.vorname)}
            ${row("Nachname", body.nachname)}
            ${row("E-Mail", body.email)}
            ${row("Unternehmen", body.unternehmen)}
            ${row("Website", body.website)}
            ${row("Rolle", body.rolle)}
          </table>
        </td></tr>

        <!-- Importdaten -->
        <tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8">Importdaten</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
            ${row("Importvorgänge / Jahr", body.importvorgaenge)}
            ${row("Importvolumen / Jahr", body.importvolumen)}
            ${row("Herkunftsländer", body.herkunftslaender)}
            ${row("Warengruppen", body.warengruppen)}
            ${row("Zolldienstleister", body.zolldienstleister)}
            ${row("Letzte Zollprüfung", body.letzteZollpruefung)}
          </table>
        </td></tr>

        <!-- Anmerkungen -->
        ${body.nachricht ? `<tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8">Anmerkungen</p>
          <div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;color:#0f172a;font-size:13px">${body.nachricht}</div>
        </td></tr>` : ""}

        <!-- Hochgeladene Dokumente -->
        <tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8">Hochgeladene Dokumente</p>
          <div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px">
            <ul style="margin:0;padding-left:16px">${fileLinks}</ul>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 32px;border-top:1px solid #e2e8f0;margin-top:24px">
          <p style="margin:0;font-size:12px;color:#94a3b8">Diese E-Mail wurde automatisch vom ZollMetrics Webformular gesendet.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      vorname = "", nachname = "", email, unternehmen,
      website = "", rolle = "",
      importvorgaenge = "", importvolumen = "",
      herkunftslaender = "", warengruppen = "",
      zolldienstleister = "", letzteZollpruefung = "",
      nachricht = "",
      files = [] as UploadedFile[],
    } = body

    if (!email || !unternehmen) {
      return NextResponse.json(
        { error: "Unternehmensname und E-Mail sind erforderlich." },
        { status: 400 }
      )
    }

    const transporter = getTransporter()
    const date = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })
    await transporter.sendMail({
      from: `"ZollMetrics Web-Formular" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_RECEIVER_EMAIL ?? "team@zollmetrics.com",
      replyTo: email,
      subject: `Neuer Erstcheck: ${unternehmen} - ${date}`,
      html: buildEmailHtml({ vorname, nachname, email, unternehmen, website, rolle, importvorgaenge, importvolumen, herkunftslaender, warengruppen, zolldienstleister, letzteZollpruefung, nachricht, files }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("upload-to-drive route error:", err)
    return NextResponse.json({ error: "Interner Fehler." }, { status: 500 })
  }
}
