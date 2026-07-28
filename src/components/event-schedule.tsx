import { Clock } from 'lucide-react'

export function EventSchedule() {
  return (
    <div className="w-full rounded-[3rem] border border-white/5 bg-white/2 p-12 backdrop-blur-2xl xl:p-16">
      <div className="mb-20 grid items-end gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <span className="text-primary text-sm font-black tracking-[0.4em] uppercase">
            Cronograma
          </span>
          <h2 className="text-5xl font-black tracking-tighter text-white uppercase lg:text-7xl">
            Siga cada <br />{' '}
            <span className="text-primary italic">Movimento</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md text-xl leading-relaxed font-medium">
          Não perca nem um segundo da ação. Preparamos um cronograma milimétrico
          para garantir a melhor experiência esportiva.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <ScheduleItem
          time="09:00"
          title="Abertura dos Portões"
          description="Entrada antecipada para portadores de ingressos Gold e Silver com acesso ao lounge exclusivo."
          isActive
        />
        <ScheduleItem
          time="11:30"
          title="Sessão de Aquecimento"
          description="Veja os atletas de elite se preparando na arena principal com comentários ao vivo."
        />
        <ScheduleItem
          time="13:00"
          title="Cerimônia de Abertura"
          description="Um espetáculo visual e sonoro para celebrar a união e a força do esporte mundial."
        />
        <ScheduleItem
          time="14:30"
          title="Grande Final"
          description="O confronto épico decisivo. Prepare seu coração para o momento que entrará para a história."
        />
        <ScheduleItem
          time="19:00"
          title="Meet & Greet Premium"
          description="Encontro exclusivo para os ingressos Gold com os campeões do evento."
        />
      </div>
    </div>
  )
}

interface ScheduleItemProps {
  description: string
  isActive?: boolean
  time: string
  title: string
}

function ScheduleItem({
  description,
  isActive,
  time,
  title,
}: ScheduleItemProps) {
  return (
    <div className="group relative flex gap-10 pb-12 last:pb-0">
      {/* Connector Line */}
      <div className="absolute top-10 left-[2.4rem] h-full w-px bg-white/10 group-last:hidden" />

      {/* Time Box */}
      <div
        className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border-2 transition-all duration-500 hover:scale-110 ${isActive ? 'border-primary bg-primary/10 shadow-primary/20 glow-primary shadow-2xl' : 'border-white/10 bg-white/5 opacity-50'}`}
      >
        <Clock
          className={`mb-1 size-5 ${isActive ? 'text-primary' : 'text-white/40'}`}
        />
        <span
          className={`text-lg font-black tracking-tighter ${isActive ? 'text-white' : 'text-white/40'}`}
        >
          {time}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
        <h4
          className={`text-2xl font-black tracking-tight uppercase transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white'}`}
        >
          {title}
        </h4>
        <p className="text-muted-foreground/80 mt-2 max-w-lg text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
