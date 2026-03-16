import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Camera, Compass, Home, Utensils, MapPin } from "lucide-react";

interface TravelThemesSectionProps {
  openPlanModal: () => void;
}

const travelThemes = [
  { icon: Leaf, title: "Nature & Wildlife", description: "Safaris, rainforests, and stunning natural landscapes" },
  { icon: Camera, title: "Cultural Heritage", description: "Historic sites, museums, and local traditions" },
  { icon: Compass, title: "Adventure", description: "Exciting activities and outdoor explorations" },
  { icon: Home, title: "Relaxation", description: "Beach resorts and peaceful retreats" },
  { icon: Utensils, title: "Food & Culture", description: "Culinary tours and local cuisine experiences" },
  { icon: MapPin, title: "Multi-Country Tours", description: "Explore multiple destinations in one journey" },
];

export default function TravelThemesSection({ openPlanModal }: TravelThemesSectionProps) {
  return (
    <div className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
            Choose Your Family Adventure Theme
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            What kind of international experience does your family want?
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {travelThemes.map((theme, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-orange-400 group"
              onClick={openPlanModal}
            >
              <CardContent className="p-6 md:p-8">
                <theme.icon size={48} className="text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-xl md:text-2xl mb-2">{theme.title}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">{theme.description}</p>
                <span className="text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center">
                  Plan this trip →
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}