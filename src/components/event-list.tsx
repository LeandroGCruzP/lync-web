import { getEvents } from '~/http/get-events'
import { EventCard } from './event-card'

export async function EventList() {
  const { events } = await getEvents()

  if (events.length === 0) {
    return (
      <div className="border-muted flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground text-sm font-medium">
          Nenhum evento encontrado.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => {
        return <EventCard key={event.id} event={event} />
      })}
    </div>
  )
}
