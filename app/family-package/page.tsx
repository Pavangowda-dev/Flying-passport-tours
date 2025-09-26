"use client";

import { useEffect, useState } from "react";
import { Clock, Users, Heart, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import WhatsAppButton from "@/components/whatsapp-button";
import { createBrowserClientSupabase } from "@/lib/supabase/client";

export default function FamilyPackagePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const validateMobileNumber = (number: string) => {
    return /^\+?[1-9]\d{1,14}$/.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMobileNumber(mobileNumber)) {
      setError("Please enter a valid mobile number (e.g., +919876543210)");
      return;
    }

    try {
      const supabase = createBrowserClientSupabase();
      const insertData = {
        mobile_number: mobileNumber,
        created_at: new Date().toISOString(),
      };
      console.log("Submitting to Supabase:", insertData);

      const { data, error } = await supabase
        .from("notify_me")
        .insert([insertData])
        .select();

      if (error) {
        console.error("Supabase insert error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        throw new Error(error.message);
      }

      console.log("Supabase insert successful:", data);
      setToastMessage("Thank you! We'll notify you when family packages are available.");
      setToastType("success");
      setToastOpen(true);
      setMobileNumber("");
      setError("");
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Unexpected error in notify me submission:", {
        message: err.message,
        stack: err.stack,
      });
      setToastMessage("Error submitting your number. Please try again.");
      setToastType("error");
      setToastOpen(true);
    }
  };

  return (
    <div className="pt-28 md:pt-32 pb-8 md:pb-16">
      <WhatsAppButton alwaysVisible={true} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-6">Family Package</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl">
            Special travel packages designed for families to create unforgettable memories together
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-8 md:p-12 bg-gradient-to-br from-secondary/10 to-accent/10">
            <CardContent className="space-y-8">
              <div className="w-24 h-24 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
                <Heart size={48} className="text-secondary" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl md:text-3xl mb-4">Coming Soon!</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  We're working on something special for families. Our family packages will include:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <Users size={24} className="text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Family-Friendly Activities</h3>
                    <p className="text-sm text-muted-foreground">
                      Specially curated activities suitable for all age groups
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock size={24} className="text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Flexible Itineraries</h3>
                    <p className="text-sm text-muted-foreground">
                      Relaxed schedules with plenty of time for family bonding
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart size={24} className="text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Special Pricing</h3>
                    <p className="text-sm text-muted-foreground">
                      Attractive family discounts and child-friendly pricing
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 rounded-lg p-6">
                <h3 className="font-serif font-bold text-xl mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to know when our family packages are available. We'll notify you as soon as we launch!
                </p>
                <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <Dialog.Trigger asChild>
                    <Button className="bg-secondary hover:bg-accent hover:text-primary transition-colors">
                      Notify Me When Available
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg p-6 w-full max-w-md z-50">
                      <Dialog.Title className="font-serif font-bold text-xl mb-4">
                        Get Notified
                      </Dialog.Title>
                      <Dialog.Description className="text-muted-foreground mb-4">
                        Enter your mobile number to receive updates on family package availability.
                      </Dialog.Description>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="mobileNumber">Mobile Number</Label>
                          <Input
                            id="mobileNumber"
                            type="tel"
                            placeholder="+919876543210"
                            value={mobileNumber}
                            onChange={(e) => {
                              setMobileNumber(e.target.value);
                              setError("");
                            }}
                            className={error ? "border-red-500" : ""}
                          />
                          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Dialog.Close asChild>
                            <Button variant="outline">Cancel</Button>
                          </Dialog.Close>
                          <Button type="submit" className="bg-secondary hover:bg-accent hover:text-primary">
                            Submit
                          </Button>
                        </div>
                      </form>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Expected Launch: Q2 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-12 md:mt-16">
          <h3 className="font-serif font-bold text-xl md:text-2xl mb-4">Have Questions?</h3>
          <p className="text-muted-foreground mb-6">
            Contact us for more information about our upcoming family packages
          </p>
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/contact">Call Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          open={toastOpen}
          onOpenChange={setToastOpen}
          className={cn(
            "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50",
            toastType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          )}
        >
          <Toast.Description>{toastMessage}</Toast.Description>
          <Toast.Close className="absolute top-2 right-2 p-1">
            <X size={16} />
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </div>
  );
}