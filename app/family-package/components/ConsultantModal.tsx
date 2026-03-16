"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Calendar } from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react";

interface ConsultantModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  openPlanModal?: () => void; // Optional: to open the main form from inside this modal
}

export default function ConsultantModal({
  isOpen,
  onOpenChange,
  openPlanModal,
}: ConsultantModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 md:p-8 w-[95vw] md:w-full max-w-md z-50">
          <Dialog.Title className="font-serif font-bold text-xl md:text-2xl mb-4 text-orange-600">
            Free Family Travel Consultation
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6 text-sm md:text-base">
            Get expert advice from our international family travel specialists
          </Dialog.Description>

          <div className="space-y-4">
            {/* WhatsApp Option */}
            <Card className="p-4 border-orange-200 bg-orange-50">
              <div className="flex items-start gap-3">
                <WhatsappLogo
                  size={24}
                  weight="fill"
                  className="text-green-600 mt-1 flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-bold mb-1 text-sm md:text-base">
                    WhatsApp Consultation
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 mb-3">
                    Chat instantly with our experts
                  </p>
                  <Button
                    onClick={() =>
                      window.open(
                        "https://wa.me/917795538639?text=Hi, I need help planning an international family trip",
                        "_blank"
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 w-full text-sm md:text-base"
                  >
                    <WhatsappLogo size={20} weight="fill" className="mr-2" />
                    Start WhatsApp Chat
                  </Button>
                </div>
              </div>
            </Card>

            {/* Schedule Call / Fill Form Option */}
            <Card className="p-4 border-orange-200">
              <div className="flex items-start gap-3">
                <Calendar className="text-orange-600 mt-1 flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h4 className="font-bold mb-1 text-sm md:text-base">
                    Schedule a Call
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 mb-3">
                    Book a convenient time to speak
                  </p>
                  <Button
                    onClick={() => {
                      onOpenChange(false); // Close consultant modal
                      if (openPlanModal) openPlanModal(); // Open main plan trip form
                    }}
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 text-sm md:text-base"
                  >
                    Fill Contact Form
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Close Button */}
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