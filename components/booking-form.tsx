'use client';

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { submitBooking } from "@/actions/booking";

const destinations = [
  { value: "vietnam_7_days", label: "7 Days Vietnam Tour" },
  { value: "scandinavia_10_days", label: "10 Days Scandinavia Tour" },
  { value: "kenya_6_days", label: "6 Days Kenya Safari" },
];

interface BookingFormProps {
  tourId?: string;
  tourTitle?: string;
  departureDate?: string;
}

interface FormState {
  success: boolean;
  message: string;
}

export default function BookingForm({
  tourId,
  tourTitle,
  departureDate,
}: BookingFormProps) {
  const [state, setState] = useState<FormState>({
    success: false,
    message: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [contactType, setContactType] = useState("whatsapp");
  const [destination, setDestination] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setIsPending(true);
    setState({ success: false, message: "" });

    try {
      if (!tourTitle && destination) {
        formData.set("destination", destination);
      }

      const result = await submitBooking(formData);

      setState(result);

      if (result.success) {
        formRef.current?.reset();
        setDestination("");
        setContactType("whatsapp");
      }
    } catch (error: any) {
      setState({
        success: false,
        message: "Failed to submit booking.",
      });
    } finally {
      setIsPending(false);
    }
  };

  const contactLabel =
    contactType === "whatsapp"
      ? "WhatsApp Number"
      : "Email Address";

  return (
    <div className="space-y-4">
      {/* Departure */}
      <div className="bg-muted p-3 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">Departure</p>
        <p className="font-bold">
          {departureDate || "Dates coming soon"}
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="tourTitle" value={tourTitle || ""} />
        <input type="hidden" name="tourId" value={tourId || ""} />
        <input type="hidden" name="contactType" value={contactType} />

        {!tourTitle && (
          <input type="hidden" name="destination" value={destination} />
        )}

        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input name="name" placeholder="Your Name" required />
        </div>

        {/* Contact Type */}
        <div className="space-y-2">
          <Label>Contact Method</Label>
          <RadioGroup
            value={contactType}
            onValueChange={setContactType}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="whatsapp" id="whatsapp" />
              <Label htmlFor="whatsapp">WhatsApp</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Contact Input */}
        <div className="space-y-2">
          <Label>{contactLabel}</Label>
          <Input
            name="contactValue"
            type={contactType === "email" ? "email" : "tel"}
            placeholder={
              contactType === "email"
                ? "your@email.com"
                : "+919876543210"
            }
            required
          />
        </div>

        {/* Destination */}
        {!tourTitle && (
          <div className="space-y-2">
            <Label>Destination</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Select Tour" />
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

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-accent hover:text-primary"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Book Now"}
        </Button>

        {/* Result */}
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
    </div>
  );
}