import dayjs from 'dayjs'
import { Calendar, MapPin, Users, Wallet } from 'lucide-react'
import Image from 'next/image'
import { Event, SportName } from '~/interfaces/event-interfaces'
import { SPORT_IMAGES_PATHS } from '~/utils/sport-assets'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const startDate = dayjs(event.startDate).format('DD/MM/YYYY [às] HH:mm')
  const price = event.price
    ? new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      }).format(event.price / 100)
    : 'Grátis'

  const coverImage =
    (event.sport?.name && SPORT_IMAGES_PATHS[event.sport.name]) ||
    SPORT_IMAGES_PATHS[SportName.SOCCER]

  return (
    <Card className="group relative flex min-h-[220px] flex-col overflow-hidden border-zinc-800 bg-zinc-950 text-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={coverImage}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="group-hover:blur-0 scale-100 object-cover opacity-80 blur-[0.5px] brightness-75 filter transition-all duration-500 group-hover:scale-105 group-hover:opacity-45"
        />
        {/* Soft dark gradient overlays to guarantee perfect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-900/30" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Card Content - elevated via z-10 */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="line-clamp-2 text-xl font-bold tracking-tight text-white transition-colors duration-200">
              {event.name}
            </CardTitle>
            <Badge
              variant="outline"
              className="border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold tracking-wider whitespace-nowrap text-white uppercase shadow-xs backdrop-blur-md"
            >
              {event.sport?.name ?? 'Evento'}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-1.5 font-medium text-zinc-300">
            <span className="flex items-center justify-center rounded-full bg-white/10 p-1 backdrop-blur-xs">
              <MapPin className="h-3 w-3 text-zinc-200" />
            </span>
            <span className="line-clamp-1">
              {event.organization?.name ?? 'Organizador Independente'}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 pt-1 pb-3">
          {event.description && (
            <p className="line-clamp-2 text-sm leading-relaxed font-light text-zinc-300/90">
              {event.description}
            </p>
          )}

          <div className="grid grid-cols-1 gap-2 border-t border-white/10 pt-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
              <span className="flex items-center justify-center rounded-sm bg-white/10 p-1.5 backdrop-blur-xs">
                <Calendar className="h-3.5 w-3.5 text-zinc-200" />
              </span>
              <span>{startDate}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
              <span className="flex items-center justify-center rounded-sm bg-white/10 p-1.5 backdrop-blur-xs">
                <Wallet className="h-3.5 w-3.5 text-zinc-200" />
              </span>
              <span>{price}</span>
            </div>
            {event.slots !== null && (
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-200 sm:col-span-2">
                <span className="flex items-center justify-center rounded-sm bg-white/10 p-1.5 backdrop-blur-xs">
                  <Users className="h-3.5 w-3.5 text-zinc-200" />
                </span>
                <span>
                  {event.slots} vagas{' '}
                  {event.playersPerTeam
                    ? `(${event.playersPerTeam} p/ time)`
                    : null}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2 pb-4">
          <div className="flex w-full items-center justify-between border-t border-white/10 pt-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-zinc-300 uppercase">
              {event.paymentModel.replace(/_/g, ' ')}
            </span>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
