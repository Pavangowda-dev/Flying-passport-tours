"use client"

import { useState, useEffect, useActionState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitEarlyAccess } from "@/actions/popup"

interface EarlyAccessPopupProps {
  tourTitle: string
  isExpired: boolean
}

export default function EarlyAccessPopup({ tourTitle, isExpired }: EarlyAccessPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  const [state, formAction, isPending] = useActionState(submitEarlyAccess, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (isExpired) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isExpired])

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setIsClosed(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state.success])

  const handleClose = () => {
    setIsVisible(false)
    setIsClosed(true)
  }

  const getDestinationName = (title: string) => {
    if (title.includes("Japan")) return "Japan"
    if (title.includes("Italian") || title.includes("Italy")) return "Italy"
    if (title.includes("Turkish") || title.includes("Turkey")) return "Turkey"
    if (title.includes("Thailand")) return "Thailand"
    if (title.includes("Vietnam")) return "Vietnam"
    if (title.includes("Greek") || title.includes("Greece")) return "Greece"
    if (title.includes("Moroccan") || title.includes("Morocco")) return "Morocco"
    if (title.includes("Kenya") || title.includes("Kenyan")) return "Kenya"
    if (title.includes("Europe") || title.includes("European")) return "Europe"
    return title.split(" ")[0]
  }

  if (!isVisible || !isExpired) return null

  const destinationName = getDestinationName(tourTitle)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-md relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="font-serif font-bold text-2xl mb-2">Register Your Early Seats to {destinationName}!</h2>
            <p className="text-muted-foreground">
              Be the first to know when this amazing tour becomes available again. Get early access and special offers!
            </p>
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="tourTitle" value={tourTitle} />
            <div className="space-y-2">
              <Label htmlFor="early-name">Name</Label>
              <Input id="early-name" name="name" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label>Preferred Contact Method</Label>
              <RadioGroup name="contactType" defaultValue="email" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="early-email-option" />
                  <Label htmlFor="early-email-option">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="early-whatsapp-option" />
                  <Label htmlFor="early-whatsapp-option">WhatsApp</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="early-contact">Email Address or WhatsApp Number</Label>
              <Input
                id="early-contact"
                name="contactValue"
                type="text"
                placeholder="Your Email or WhatsApp Number"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-accent hover:text-primary transition-colors"
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Get Early Access"}
            </Button>
            {state.message && (
              <div
                className={`p-3 rounded-md text-center ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {state.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}