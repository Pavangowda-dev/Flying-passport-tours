"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const destinations = [
  "Europe (Multi-Country)",
  "Kenya - Safari Adventure",
  "Amazon Forest - Brazil",
  "Masai Mara - Kenya",
  "Japan - Cultural Experience",
  "China - Heritage Tour",
  "Vietnam - Scenic Beauty",
  "Turkey - Historic Journey",
  "Italy - Art & Culture",
  "Switzerland - Alps Experience",
  "Dubai - Luxury Getaway",
  "Thailand - Beach Paradise",
  "Singapore - City Experience",
  "Maldives - Island Retreat",
  "Bali - Tropical Escape",
  "Custom Destination",
];

const months = Array.from({ length: 12 }, (_, i) => {
  const month = new Date(2026, i).toLocaleString("default", { month: "long" });
  return `${month} 2026`;
});

const budgetRanges = [
  "₹1,00,000 - ₹2,00,000",
  "₹2,00,000 - ₹3,50,000",
  "₹3,50,000 - ₹5,00,000",
  "₹5,00,000 - ₹7,50,000",
  "₹7,50,000 - ₹10,00,000",
  "₹10,00,000+",
];

interface PlanTripModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PlanTripModal({ isOpen, onOpenChange }: PlanTripModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    customDestination: "",
    travelMonth: "",
    adults: "",
    kids: "",
    kidsAge: "",
    budget: "",
    specialNeeds: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showKidsAge, setShowKidsAge] = useState(false);
  const [showCustomDestination, setShowCustomDestination] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));

    if (field === "kids") {
      const hasKids = value !== "" && value !== "0";
      setShowKidsAge(hasKids);
      if (!hasKids) {
        setFormData((prev) => ({ ...prev, kidsAge: "" }));
      }
    }

    if (field === "destination") {
      const isCustom = value === "Custom Destination";
      setShowCustomDestination(isCustom);
      if (!isCustom) {
        setFormData((prev) => ({ ...prev, customDestination: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[1-9]\d{9,14}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.destination) newErrors.destination = "Please select a destination";
    if (showCustomDestination && !formData.customDestination.trim()) {
      newErrors.customDestination = "Please enter your custom destination";
    }
    if (!formData.travelMonth) newErrors.travelMonth = "Please select travel month";
    if (!formData.adults) newErrors.adults = "Number of adults is required";
    if (!formData.kids) newErrors.kids = "Number of kids is required";
    if (showKidsAge && !formData.kidsAge.trim()) newErrors.kidsAge = "Kids age is required";
    if (!formData.budget) newErrors.budget = "Please select a budget range";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      onOpenChange(false);
      setSubmitSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        customDestination: "",
        travelMonth: "",
        adults: "",
        kids: "",
        kidsAge: "",
        budget: "",
        specialNeeds: "",
      });
      setShowKidsAge(false);
      setShowCustomDestination(false);
    }, 2000);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 md:p-8 w-[95vw] md:w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="font-serif font-bold text-2xl md:text-3xl mb-2 text-orange-600">
            Plan Your Perfect International Family Trip
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6 text-sm md:text-base">
            Fill in the details and our family travel experts will create a customized international itinerary for you
          </Dialog.Description>

          {submitSuccess ? (
            <div className="text-center py-12">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-2xl mb-2">Thank You!</h3>
              <p className="text-gray-600">
                We'll contact you within 24 hours with your customized international family package.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                    className={cn(errors.name && "border-red-500")}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className={cn(errors.email && "border-red-500")}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+919876543210"
                  className={cn(errors.phone && "border-red-500")}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Destination & Travel Month */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destination">Preferred Destination *</Label>
                  <Select value={formData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                    <SelectTrigger className={cn(errors.destination && "border-red-500")}>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                </div>

                <div>
                  <Label htmlFor="travelMonth">Travel Month *</Label>
                  <Select value={formData.travelMonth} onValueChange={(value) => handleInputChange("travelMonth", value)}>
                    <SelectTrigger className={cn(errors.travelMonth && "border-red-500")}>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.travelMonth && <p className="text-red-500 text-xs mt-1">{errors.travelMonth}</p>}
                </div>
              </div>

              {/* Custom Destination */}
              {showCustomDestination && (
                <div>
                  <Label htmlFor="customDestination">Enter Your Custom Destination *</Label>
                  <Input
                    id="customDestination"
                    value={formData.customDestination}
                    onChange={(e) => handleInputChange("customDestination", e.target.value)}
                    placeholder="e.g., New Zealand, Norway, etc."
                    className={cn(errors.customDestination && "border-red-500")}
                  />
                  {errors.customDestination && (
                    <p className="text-red-500 text-xs mt-1">{errors.customDestination}</p>
                  )}
                </div>
              )}

              {/* Adults & Kids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adults">Number of Adults *</Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={(e) => handleInputChange("adults", e.target.value)}
                    placeholder="2"
                    className={cn(errors.adults && "border-red-500")}
                  />
                  {errors.adults && <p className="text-red-500 text-xs mt-1">{errors.adults}</p>}
                </div>

                <div>
                  <Label htmlFor="kids">Number of Kids *</Label>
                  <Input
                    id="kids"
                    type="number"
                    min="0"
                    value={formData.kids}
                    onChange={(e) => handleInputChange("kids", e.target.value)}
                    placeholder="0"
                    className={cn(errors.kids && "border-red-500")}
                  />
                  {errors.kids && <p className="text-red-500 text-xs mt-1">{errors.kids}</p>}
                </div>
              </div>

              {/* Kids Age */}
              {showKidsAge && (
                <div>
                  <Label htmlFor="kidsAge">Age of Kids (comma separated) *</Label>
                  <Input
                    id="kidsAge"
                    value={formData.kidsAge}
                    onChange={(e) => handleInputChange("kidsAge", e.target.value)}
                    placeholder="e.g., 5, 8, 12"
                    className={cn(errors.kidsAge && "border-red-500")}
                  />
                  {errors.kidsAge && <p className="text-red-500 text-xs mt-1">{errors.kidsAge}</p>}
                </div>
              )}

              {/* Budget */}
              <div>
                <Label htmlFor="budget">Budget Range (Per Person) *</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger className={cn(errors.budget && "border-red-500")}>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
              </div>

              {/* Special Needs */}
              <div>
                <Label htmlFor="specialNeeds">Any Special Requirements? (Optional)</Label>
                <Textarea
                  id="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={(e) => handleInputChange("specialNeeds", e.target.value)}
                  placeholder="e.g., dietary preferences, accessibility needs, specific activities..."
                  rows={3}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  {isSubmitting ? "Submitting..." : "Get My Custom Package"}
                </Button>
              </div>
            </div>
          )}

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition">
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}