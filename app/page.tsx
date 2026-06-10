import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PricingFaqSection } from "@/components/pricing-faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "ZollMetrics – Versteckte Zoll-Überzahlungen finden",
  description: "Kostenloser Duty-Leak-Scan: Wir prüfen Ihre Importdaten auf Zoll-Überzahlungen.",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PricingFaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
