import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-white/50 transition-colors duration-300">
      <div className="p-3 bg-secondary/10 rounded-full mb-4">
        <Icon size={32} className="text-secondary" />
      </div>
      <h3 className="font-serif font-bold text-xl mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
