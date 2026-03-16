import { Shield, Globe, Award, CheckCircle, Headphones, Heart } from "lucide-react";

const trustBadges = [
  { icon: Shield, title: "100% Safe Travel", subtitle: "Child-friendly experiences" },
  { icon: Globe, title: "15+ Countries", subtitle: "International expertise" },
  { icon: Award, title: "Expert Guides", subtitle: "Professional tour leaders" },
  { icon: CheckCircle, title: "Verified Agency", subtitle: "Registered & certified" },
  { icon: Headphones, title: "24/7 Support", subtitle: "Always here for you" },
  { icon: Heart, title: "Personalized Care", subtitle: "Customized experiences" },
];

export default function TrustBadgesSection() {
  return (
    <div className="py-12 md:py-16 bg-white border-t border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <badge.icon size={32} className="text-orange-600" />
              </div>
              <div className="font-bold text-sm md:text-base">{badge.title}</div>
              <div className="text-xs md:text-sm text-gray-600">{badge.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}