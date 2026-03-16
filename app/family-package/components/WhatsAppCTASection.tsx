import { Button } from "@/components/ui/button";
import { WhatsappLogo } from "@phosphor-icons/react";

export default function WhatsAppCTASection() {
  return (
    <div className="py-16 md:py-20 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <WhatsappLogo size={64} weight="fill" className="mx-auto mb-6 opacity-90" />
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Have Questions? Let's Chat!
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Connect with our family travel experts on WhatsApp for instant assistance
          </p>
          <Button
            size="lg"
            onClick={() => window.open('https://wa.me/917795538639?text=Hi, I want to plan an international family trip', '_blank')}
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6 shadow-lg hover:scale-105 transition-transform"
          >
            <WhatsappLogo size={24} weight="fill" className="mr-2" />
            Chat with Family Travel Expert
          </Button>
        </div>
      </div>
    </div>
  );
}