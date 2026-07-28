import { Check } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'

interface TicketCardProps {
  features: string[]
  isPopular?: boolean
  name: string
  price: string
}

export function TicketCard({
  features,
  isPopular,
  name,
  price,
}: TicketCardProps) {
  return (
    <Card
      className={`group relative flex flex-col overflow-hidden rounded-4xl border border-white/5 bg-white/3 transition-all duration-700 hover:scale-[1.02] hover:bg-white/5 ${isPopular ? 'border-primary/50 shadow-primary/20 z-10 scale-105 shadow-2xl' : 'border-white/5 shadow-2xl hover:border-white/10'}`}
    >
      {isPopular && (
        <div className="bg-primary text-primary-foreground glow-primary absolute top-0 right-0 rounded-bl-3xl px-8 py-3 text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl">
          Most Popular
        </div>
      )}

      <CardHeader className="p-10 pb-4">
        <h3 className="group-hover:text-primary text-4xl font-black tracking-tighter text-white uppercase italic transition-colors duration-300">
          {name}
        </h3>
        <div className="mt-8 flex items-baseline gap-2">
          <span className="text-muted-foreground/50 text-xl font-black">
            R$
          </span>
          <span className="text-7xl font-black tracking-tighter text-white">
            {price}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-10 pt-4">
        <div className="from-primary/30 mb-8 h-px w-full bg-linear-to-r to-transparent" />
        <ul className="space-y-6">
          {features.map((feature, i) => (
            <li
              key={i}
              className="text-muted-foreground flex items-center gap-4 text-lg font-medium transition-colors group-hover:text-white/80"
            >
              <div className="bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full transition-all">
                <Check className="min-h-4 min-w-4 p-1" strokeWidth={2} />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-10 pt-0">
        <Button
          className={`h-16 w-full text-lg font-black tracking-widest uppercase transition-all ${isPopular ? 'bg-primary text-primary-foreground glow-primary shadow-2xl hover:scale-[1.02]' : 'border-2 border-white/10 bg-transparent text-white hover:bg-white/5'}`}
          size="lg"
        >
          Inscrever-se
        </Button>
      </CardFooter>

      {/* HUD Accent */}
      <div className="absolute right-8 bottom-4 text-[6px] font-black tracking-[0.8em] text-white/5 uppercase">
        Premium Security • Lync Pay
      </div>
    </Card>
  )
}
