import Image from 'next/image'

interface AthleteCardProps {
  imageUrl: string
  name: string
  role: string
}

export function AthleteCard({ imageUrl, name, role }: AthleteCardProps) {
  return (
    <div className="group hover:border-primary/50 hover:shadow-primary/10 relative h-[450px] overflow-hidden rounded-4xl border border-white/5 bg-white/5 shadow-2xl transition-all duration-700">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
      />

      {/* Signature & Info Overlay */}
      <div className="from-background absolute inset-0 bg-linear-to-t via-black/20 to-transparent opacity-80" />

      <div className="absolute inset-x-0 bottom-0 p-8 text-center">
        <div className="bg-primary group-hover:glow-primary mx-auto mb-2 h-0.5 w-12 transition-all duration-500 group-hover:w-24" />
        <h4 className="group-hover:text-primary text-3xl font-black tracking-tighter text-white uppercase italic transition-colors duration-300">
          {name}
        </h4>
        <p className="text-muted-foreground/60 mt-2 text-xs font-black tracking-[0.4em] uppercase transition-colors duration-500 group-hover:text-white">
          {role}
        </p>
      </div>

      {/* HUD Detail */}
      <div className="absolute top-6 left-6 origin-left -rotate-90 text-[8px] font-black tracking-[0.5em] text-white/20 uppercase">
        Professional Profile • Lync Sports
      </div>
    </div>
  )
}
