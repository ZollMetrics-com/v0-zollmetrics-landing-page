"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    const mailtoLink = `mailto:team@zollmetrics.com?subject=Kontaktanfrage von ${formData.name} (${formData.company})&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
  }

  return (
    <section id="kontakt" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-slate-900 md:text-4xl">
            Kontakt
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">
                Sprechen Sie mit uns
              </h3>
              <p className="mb-6 text-slate-600">
                Wir analysieren Ihr Erstattungspotenzial kostenlos und unverbindlich.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:team@zollmetrics.com" 
                className="flex items-center gap-3 text-slate-600 transition-colors hover:text-blue-900"
              >
                <Mail className="h-5 w-5" />
                <span>team@zollmetrics.com</span>
              </a>
              <a 
                href="tel:+4917631384856" 
                className="flex items-center gap-3 text-slate-600 transition-colors hover:text-blue-900"
              >
                <Phone className="h-5 w-5" />
                <span>+49 176 31384856</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-slate-200 bg-slate-50">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-slate-700">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ihr Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-slate-300 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="company" className="text-slate-700">Unternehmen</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Ihr Unternehmen"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      className="border-slate-300 bg-white"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-slate-700">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-slate-300 bg-white"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-slate-700">Nachricht</Label>
                  <Textarea
                    id="message"
                    placeholder="Ihre Nachricht..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="border-slate-300 bg-white"
                  />
                </div>
                
                <Button type="submit" className="mt-2 bg-blue-900 text-white hover:bg-blue-800">
                  <Send className="mr-2 h-4 w-4" />
                  Senden
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
