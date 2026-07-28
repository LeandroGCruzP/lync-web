import { Calendar, DollarSign, Users } from 'lucide-react'

interface EventStatsBarProps {
  date: string
  price: string
  slots: string
}

export function EventStatsBar({ date, price, slots }: EventStatsBarProps) {
  return (
    <div className="animate-in fade-in grid grid-cols-3 divide-x divide-y divide-white/5 rounded-4xl border border-white/10 duration-1000">
      <EventStat
        icon={<Calendar className="size-6" />}
        label="Data"
        value={date}
      />
      <EventStat
        icon={<Users className="size-6" />}
        label="Vagas"
        value={slots}
      />
      <EventStat
        icon={<DollarSign className="size-6" />}
        label="Valor"
        isAction
        value={price}
      />
    </div>
  )
}

interface EventStatProps {
  icon: React.ReactNode
  isAction?: boolean
  label: string
  value: string
}

function EventStat({ icon, isAction, label, value }: EventStatProps) {
  return (
    <div
      className={`group flex flex-col items-center justify-center border-l border-white/5 p-8 text-center transition-all first:border-l-0 hover:bg-white/5 ${isAction ? 'bg-primary/5' : ''}`}
    >
      <div
        className={`text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner transition-all duration-500 group-hover:scale-110 ${isAction ? 'glow-primary' : ''}`}
      >
        {icon}
      </div>
      <span className="text-muted-foreground/60 mb-1 text-[10px] font-black tracking-[0.3em] uppercase">
        {label}
      </span>
      <span className="text-2xl font-black tracking-tight text-white uppercase md:text-3xl">
        {value}
      </span>
    </div>
  )
}
