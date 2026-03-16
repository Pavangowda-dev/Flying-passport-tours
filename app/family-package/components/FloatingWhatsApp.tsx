import { WhatsappLogo } from "@phosphor-icons/react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi, I want to plan a family trip"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl z-40 transition-transform hover:scale-110"
    >
      <WhatsappLogo size={32} weight="fill" />
    </a>
  );
}