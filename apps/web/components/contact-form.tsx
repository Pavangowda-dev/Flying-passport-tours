"use client"

import { useState, useTransition } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitContactForm } from "@/actions/contact"

export default function ContactForm() {
  const [formState, setFormState] = useState<{ success: boolean; message: string }>({ success: false, message: "" })
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      const result = await submitContactForm({ success: false, message: "" }, formData)
      setFormState(result)
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="font-serif font-bold text-3xl mb-6 text-center">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Your Email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input id="phone" name="phone" type="tel" placeholder="e.g., +919876543210" />
        </div>

        <div className="space-y-2">
          <Label>Preferred Contact Method</Label>
          <RadioGroup name="contactMethod" defaultValue="email" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="email"
                id="email-radio"
                className="max-sm:size-3 size-4 aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Label htmlFor="email-radio">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="phone"
                id="phone-radio"
                className="max-sm:size-3 size-4 aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Label htmlFor="phone-radio">Phone</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Input id="message" name="message" placeholder="Your Message" required />
        </div>

        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-accent hover:text-primary transition-colors"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Send Message"}
        </Button>

        {formState.message && (
          <div
            className={`p-3 rounded-md text-center ${
              formState.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {formState.message}
          </div>
        )}
      </form>
    </div>
  )
}