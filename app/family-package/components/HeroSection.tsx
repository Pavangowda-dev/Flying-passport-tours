import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react";

interface HeroSectionProps {
  openPlanModal: () => void;
  openConsultantModal: () => void;
}

export default function HeroSection({ openPlanModal, openConsultantModal }: HeroSectionProps) {
  return (
    <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden mt-16 md:mt-20">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url("/images/Travel-ref.png")`, // Ensure this image shows a happy family facing front
        }}
      />
      
      {/* Soft Gradient Overlay - Adjusted for a lighter, premium feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 md:bg-gradient-to-r md:from-black/50 md:to-transparent" />

      {/* Main Content Container */}
      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl space-y-6">
          
          {/* Main Headline - Matches the Mockup Typography */}
          <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] drop-shadow-md">
            Creating Timeless Memories <br className="hidden md:block" />
            <span className="text-orange-400">for Every Generation</span>
          </h1>

          {/* Subtext */}
          <div className="space-y-2">
            <p className="text-lg md:text-2xl text-white/95 font-medium tracking-wide">
              Premium Family Vacation Packages by Flying Passport Tours
            </p>
            <p className="text-sm md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
              Explore the world together with hand-picked international destinations, 
              kid-friendly activities, and 100% hassle-free planning.
            </p>
          </div>

          {/* Action Buttons - Responsive Stack for Mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              size="lg"
              onClick={openPlanModal}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-7 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Calendar className="mr-2" size={24} />
              Explore Family Packages
            </Button>

            <Button
              size="lg"
              onClick={openConsultantModal}
              variant="outline"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-10 py-7 rounded-full transition-all duration-300 hover:scale-105"
            >
              <WhatsappLogo size={24} weight="fill" className="mr-2" />
              Chat with Expert
            </Button>
          </div>

          {/* Trust Indicators (Optional - Small icons below buttons) */}
          <div className="pt-8 flex items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
              24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
              Kid-Safe Stays
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}