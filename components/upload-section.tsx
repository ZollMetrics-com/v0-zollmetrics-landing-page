import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ShieldCheck, Check } from "lucide-react"

const uploadFeatures = [
  "256-bit SSL-Verschlüsselung",
  "DSGVO-konformer Serverstandort in der EU",
  "Automatische Löschung nach Projektabschluss",
]

export function UploadSection() {
  return (
    <section id="datenraum" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="border-slate-200 bg-slate-100">
          <CardContent className="flex flex-col items-center gap-6 p-8 text-center md:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-900/10">
              <ShieldCheck className="h-7 w-7 text-blue-900" />
            </div>
            
            <div>
              <h2 className="mb-2 text-2xl font-bold text-blue-900">Der Datenraum</h2>
              <p className="mx-auto max-w-lg text-slate-600">
                Für Bestandskunden: Laden Sie Ihre Archivdaten sicher und DSGVO-konform hoch.
              </p>
            </div>
            
            <ul className="flex flex-col gap-2 text-left sm:flex-row sm:gap-6">
              {uploadFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild size="lg" className="bg-blue-900 text-white hover:bg-blue-800">
              <a 
                href="https://drive.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Upload className="mr-2 h-4 w-4" />
                Zum sicheren Google Drive Portal
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
