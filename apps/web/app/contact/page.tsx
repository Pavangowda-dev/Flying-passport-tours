"use client"

import { useEffect, useState, useTransition } from "react"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import WhatsAppButton from "@/components/whatsapp-button"
import { submitContactForm } from "@/actions/contact"

export default function ContactPage() {
  const [state, setState] = useState({
    success: false,
    message: "",
  })

  const [isPending, startTransition] = useTransition()

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await submitContactForm(formData)
      setState(result)
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (state.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement
      form?.reset()
    }
  }, [state.success])

  return (
    <div className="pt-28 md:pt-32 pb-8 md:pb-16">
      <WhatsAppButton alwaysVisible />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-serif font-bold text-3xl mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Contact us for any inquiries or to book your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-serif font-bold text-2xl mb-6">Contact Us</h2>

              <form id="contact-form" action={formAction} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Your Name</Label>
                    <Input name="name" required />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input name="email" type="email" required />
                  </div>
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input name="phone" />
                </div>

                <div>
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup name="contactMethod" defaultValue="email">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone">Phone</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea name="message" rows={5} required />
                </div>

                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Sending..." : "Send Message"}
                </Button>

                {state.message && (
                  <div
                    className={`p-3 rounded text-center ${
                      state.success
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {state.message}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Right column unchanged */}
          {/* (contact info + socials stays exactly as you had it) */}
        </div>
      </div>
    </div>
  )
}
