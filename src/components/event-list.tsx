import Link from 'next/link'
import { getEvents } from '~/http/get-events'
import { EventCard } from './event-card'

interface EventListProps {
  filter?: 'standalone'
  organizationSlug?: string
  teamSlug?: string
}

export async function EventList({
  filter,
  organizationSlug,
  teamSlug,
}: EventListProps) {
  const { events } = await getEvents({ filter, organizationSlug, teamSlug })

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
        const eventHref = event.organization
          ? `/org/${event.organization.slug}/events/${event.slug}`
          : `/events/${event.slug}`

        return (
          <Link href={eventHref} key={event.id}>
            <EventCard key={event.id} event={event} />
          </Link>
        )
      })}
    </div>
  )
}
