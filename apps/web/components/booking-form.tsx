'use client';

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitBooking } from "@/actions/booking"

const destinations = [
  { value: "japan", label: "Japan" },
  { value: "europe", label: "Europe" },
  { value: "turkey", label: "Turkey" },
  { value: "kenya", label: "Kenya" },
  { value: "thailand", label: "Thailand" },
  { value: "vietnam", label: "Vietnam" },
  { value: "china", label: "China" },
]

interface BookingFormProps {
  tourId?: string
  tourTitle?: string
  departureDate?: string
}

interface FormState {
  success: boolean
  message: string
}

export default function BookingForm({
  tourId,
  tourTitle,
  departureDate,
}: BookingFormProps) {
  const [state, setState] = useState<FormState>({
    success: false,
    message: "",
  })
  const [isPending, setIsPending] = useState(false)

  // Contact method
  const [contactType, setContactType] = useState("whatsapp")

  // Destination (only if no tourTitle)
  const [destination, setDestination] = useState("")

  const contactLabel =
    contactType === "whatsapp"
      ? "Your WhatsApp Number"
      : "Your Email Address"

  const contactPlaceholder =
    contactType === "whatsapp"
      ? "e.g., +919876543210"
      : "e.g., your.email@example.com"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsPending(true)
    setState({ success: false, message: "" })

    try {
      // Add destination to formData if no tourTitle
      if (!tourTitle && destination) {
        formData.set("destination", destination)
      }

      const result = await submitBooking(formData)
      setState(result)
    } catch (error: any) {
      setState({ 
        success: false, 
        message: error.message || "Failed to submit booking. Please try again." 
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted p-3 rounded-lg text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Departure Date
        </p>
        <p className="font-serif font-bold text-lg">
          {departureDate || "Dates will be announced soon"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="tourTitle" value={tourTitle || ""} />
        <input type="hidden" name="tourId" value={tourId || ""} />
        <input type="hidden" name="contactType" value={contactType} />
        {!tourTitle && <input type="hidden" name="destination" value={destination} />}

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" required />
        </div>

        <div className="space-y-2">
          <Label>Contact Method</Label>
          <RadioGroup
            value={contactType}
            onValueChange={setContactType}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="whatsapp"
                id="whatsapp-option"
                className="size-4 rounded-full border border-primary"
              />
              <Label htmlFor="whatsapp-option">WhatsApp</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="email"
                id="email-option"
                className="size-4 rounded-full border border-primary"
              />
              <Label htmlFor="email-option">Email</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactValue">{contactLabel}</Label>
          <Input
            id="contactValue"
            name="contactValue"
            type={contactType === "email" ? "email" : "tel"}
            placeholder={contactPlaceholder}
            required
          />
        </div>

        {!tourTitle && (
          <div className="space-y-2">
            <Label htmlFor="destination">Preferred Destination</Label>
            <Select value={destination} onValueChange={setDestination} required>
              <SelectTrigger id="destination">
                <SelectValue placeholder="Select Destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest) => (
                  <SelectItem key={dest.value} value={dest.value}>
                    {dest.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-accent hover:text-primary transition-colors"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Book Now"}
        </Button>

        {state.message && (
          <div
            className={`p-3 rounded-md text-center ${
              state.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </div>
  )
}