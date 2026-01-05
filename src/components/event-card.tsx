import dayjs from 'dayjs'
import { Calendar, MapPin, Users, Wallet } from 'lucide-react'
import { Event } from '~/interfaces/event-interfaces'
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

  return (
    <Card className="hover:border-primary/50 flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-xl leading-tight font-bold">
            {event.name}
          </CardTitle>
          <Badge variant="secondary" className="whitespace-nowrap">
            {event.sport?.name ?? 'Evento'}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5" />
          {event.organization?.name ?? 'Organizador Independente'}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-3">
        {event.description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {event.description}
          </p>
        )}

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calendar className="text-primary h-4 w-4" />
            <span>{startDate}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Wallet className="text-primary h-4 w-4" />
            <span>{price}</span>
          </div>
          {event.slots !== null && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Users className="text-primary h-4 w-4" />
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

      <CardFooter className="pt-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            {event.paymentModel.replace(/_/g, ' ')}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
