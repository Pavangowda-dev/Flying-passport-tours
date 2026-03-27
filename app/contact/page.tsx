"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import WhatsAppButton from "@/components/whatsapp-button"
import { submitContactForm } from "@/actions/contact"

interface ContactFormState {
  success: boolean
  message: string
}

export default function ContactPage() {
  const [state, setState] = useState<ContactFormState>({
    success: false,
    message: "",
  })
  const [isPending, setIsPending] = useState(false)
  const [contactMethod, setContactMethod] = useState("email")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Reset form after successful submission
  useEffect(() => {
    if (state.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement
      if (form) {
        form.reset()
      }
    }
  }, [state.success])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsPending(true)
    setState({ success: false, message: "" })

    try {
      // Ensure contactMethod is in FormData
      formData.set("contactMethod", contactMethod)
      const result = await submitContactForm(formData)
      setState(result)
    } catch (error: any) {
      setState({ 
        success: false, 
        message: error.message || "Failed to send message. Please try again." 
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="pt-28 md:pt-32 pb-8 md:pb-16">
      <WhatsAppButton alwaysVisible />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            We'd love to hear from you. Contact us for any inquiries or to book your
            next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-4 md:p-6">
                <h2 className="font-serif font-bold text-xl md:text-2xl mb-6">
                  Contact Us
                </h2>

                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="contactMethod" value={contactMethod} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" name="name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Contact Method</Label>
                    <RadioGroup value={contactMethod} onValueChange={setContactMethod} name="contactMethod">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email-radio" />
                        <Label htmlFor="email-radio">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone-radio" />
                        <Label htmlFor="phone-radio">Phone</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-accent hover:text-primary transition-colors"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>

                  {state.message && (
                    <div
                      className={`p-3 rounded-md text-center text-sm ${
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
          </div>

          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="font-serif font-bold text-xl md:text-2xl mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="text-secondary mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <a
                      href="mailto:contact@flyingpassporttours.com"
                      className="text-muted-foreground hover:text-secondary transition-colors"
                    >
                      contact@flyingpassporttours.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-secondary mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <a
                      href="tel:+917795538639"
                      className="text-muted-foreground hover:text-secondary transition-colors"
                    >
                      +91 77955 38639
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="text-secondary mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold">Office Address</h3>
                    <address className="text-muted-foreground not-italic">
                      Flying Passport <br />
                      No 89, RK Arcade, Muddinapalya Rd, Yashaswini Layout, <br />
                      Lakshmayya Layout, Vishveshvaraiah Nagar, Ganganagar, Bengaluru, Karnataka 560091
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg mb-2">
                Office Hours
              </h3>
              <p className="text-muted-foreground">
                Everyday: 8:00 AM – 10:00 PM
              </p>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/1SUwhT3Ff2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/10 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                >
                  <Facebook size={20} />
                </a>

                <a
                  href="https://www.instagram.com/flyingpassport_tours"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/10 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>

                <a
                  href="https://www.youtube.com/@FlyingPassport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/10 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}