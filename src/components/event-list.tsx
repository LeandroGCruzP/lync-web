import { Settings } from 'lucide-react'
import Link from 'next/link'
import { isAuthenticated } from '~/auth/auth'
import { getEvents } from '~/http/get-events'
import { getOrganizations } from '~/http/get-organizations'
import { getProfile } from '~/http/get-profile'
import { EventCard } from './event-card'
import { Button } from './ui/button'

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
  const isLogged = await isAuthenticated()

  if (!isLogged) {
    return (
      <div className="border-muted flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground text-sm font-medium">
          Você precisa estar conectado para visualizar os eventos.
        </p>
      </div>
    )
  }

  const { events } = await getEvents({ filter, organizationSlug, teamSlug })

  let user: any = null
  let userOrgs: any[] = []

  try {
    const profileRes = await getProfile()
    user = profileRes.user
    const orgsRes = await getOrganizations()
    userOrgs = orgsRes.organizations
  } catch (err) {
    console.error('Failed to fetch user data in EventList:', err)
  }

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

        const isOwner = user && event.ownerId === user.id
        const isOrgAdmin =
          event.organization &&
          userOrgs.some(
            (org) =>
              org.slug === event.organization?.slug && org.role === 'ADMIN',
          )
        const isAdmin = !!(isOwner || isOrgAdmin)

        return (
          <div key={event.id} className="relative">
            <Link href={eventHref}>
              <EventCard event={event} />
            </Link>
            {isAdmin && (
              <div className="absolute right-6 bottom-4 z-20">
                <Button
                  asChild
                  size="sm"
                  className="flex h-6 cursor-pointer items-center justify-center gap-1 rounded-full border border-white/10 bg-zinc-900 px-3 text-[10px] font-bold tracking-widest text-white uppercase shadow-sm transition-all hover:border-white/20 hover:bg-zinc-800 active:scale-95"
                >
                  <Link href={`/events/${event.slug}/settings`}>
                    <Settings className="size-3" /> Configurar
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
