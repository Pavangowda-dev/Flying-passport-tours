"use client"

import { useEffect } from "react"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import WhatsAppButton from "@/components/whatsapp-button"
import { submitContactForm } from "@/actions/contact"
import { useActionState } from "react"

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    message: "",
  })

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

  return (
    <div className="pt-28 md:pt-32 pb-8 md:pb-16">
      <WhatsAppButton alwaysVisible={true} />

      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            We'd love to hear from you. Contact us for any inquiries or to book your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <Card>
              <CardContent className="p-4 md:p-6">
                <h2 className="font-serif font-bold text-xl md:text-2xl mb-6">Contact Us</h2>

                <form id="contact-form" action={formAction} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm md:text-base">
                        Your Name
                      </Label>
                      <Input id="name" name="name" required className="text-sm md:text-base" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm md:text-base">
                        Email
                      </Label>
                      <Input id="email" name="email" type="email" required className="text-sm md:text-base" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm md:text-base">
                      Phone Number
                    </Label>
                    <Input id="phone" name="phone" type="tel" className="text-sm md:text-base" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm md:text-base">Preferred Contact Method</Label>
                    <RadioGroup name="contactMethod" defaultValue="email">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="email"
                          id="email-radio"
                          className="!max-sm:size-3 size-4 aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Label htmlFor="email-radio" className="text-sm md:text-base">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="phone"
                          id="phone-radio"
                          className="!max-sm:size-3 size-4 aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Label htmlFor="phone-radio" className="text-sm md:text-base">
                          Phone
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm md:text-base">
                      Message
                    </Label>
                    <Textarea id="message" name="message" rows={5} required className="text-sm md:text-base" />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-accent hover:text-primary transition-colors text-sm md:text-base"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>

                  {state.message && (
                    <div
                      className={`p-3 rounded-md text-center text-sm md:text-base ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {state.message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="font-serif font-bold text-xl md:text-2xl mb-6">Contact Information</h2>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <Mail size={20} className="text-secondary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-base md:text-lg">Email</h3>
                    <a
                      href="mailto:contact@flyingpassports.com"
                      className="text-muted-foreground hover:text-secondary transition-colors text-sm md:text-base"
                    >
                      contact@flyingpassporttours.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone size={20} className="text-secondary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-base md:text-lg">Phone</h3>
                    <a
                      href="tel:+917795538639"
                      className="text-muted-foreground hover:text-secondary transition-colors text-sm md:text-base"
                    >
                      +91 77955 38639
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin size={20} className="text-secondary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-base md:text-lg">Office Address</h3>
                    <address className="text-muted-foreground not-italic text-sm md:text-base">
                      Flying Passport
                      <br />
                      1st Floor, MD Plaza near CBI office
                      <br />
                      Ganganagar, Bengaluru, Karnataka 560024
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg md:text-xl mb-4">Office Hours</h3>
              <p className="text-muted-foreground mb-2 text-sm md:text-base">Everyday: 8:00 AM - 10:00 PM</p>
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg md:text-xl mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/1SUwhT3Ff2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/10 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/flyingpassport_tours?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/10 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@FlyingPassport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/10 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
                  aria-label="YouTube"
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