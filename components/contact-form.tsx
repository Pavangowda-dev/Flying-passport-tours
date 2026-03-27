"use client";

import { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/actions/contact";

export default function ContactForm() {
  const [formState, setFormState] = useState<{
    success: boolean;
    message: string;
  }>({ success: false, message: "" });

  const [isPending, startTransition] = useTransition();
  const [contactMethod, setContactMethod] = useState("email");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // ensure contact method is included
    formData.set("contactMethod", contactMethod);

    startTransition(async () => {
      const result = await submitContactForm(formData);
      setFormState(result);

      if (result.success) {
        event.currentTarget.reset();
        setContactMethod("email");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="font-serif font-bold text-3xl mb-6 text-center">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input name="name" placeholder="Your Name" required />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input name="email" type="email" placeholder="Your Email" required />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label>Phone (Optional)</Label>
          <Input
            name="phone"
            type="tel"
            placeholder="+919876543210"
          />
        </div>

        {/* Contact Method */}
        <div className="space-y-2">
          <Label>Preferred Contact Method</Label>
          <RadioGroup
            value={contactMethod}
            onValueChange={setContactMethod}
            className="flex space-x-4"
          >
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

        {/* Message */}
        <div className="space-y-2">
          <Label>Message</Label>
          <Textarea
            name="message"
            placeholder="Your message..."
            rows={4}
            required
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-accent hover:text-primary"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Send Message"}
        </Button>

        {/* Response */}
        {formState.message && (
          <div
            className={`p-3 rounded-md text-center text-sm ${
              formState.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {formState.message}
          </div>
        )}
      </form>
    </div>
  );
}