'use client'

import { useQuery } from '@tanstack/react-query'
import { Slash } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getEvent } from '~/http/get-event'
import { getOrganization } from '~/http/get-organization'
import { getTeam } from '~/http/get-team'

interface HeaderBreadcrumbsProps {
  currentOrg: {
    name: string
    slug: string
  } | null
}

const typeLabels: Record<'event' | 'org' | 'team', string> = {
  event: 'Evento',
  org: 'Org',
  team: 'Time',
}

export function HeaderBreadcrumbs({ currentOrg }: HeaderBreadcrumbsProps) {
  const pathname = usePathname()

  // Match /org/:slug
  const orgMatch = pathname.match(/^\/org\/([^/]+)/)
  const orgSlug = orgMatch ? orgMatch[1] : null

  // Match /teams/:slug, but exclude 'create' static route
  const teamMatch = pathname.match(/^\/teams\/([^/]+)/)
  const teamSlug = teamMatch && teamMatch[1] !== 'create' ? teamMatch[1] : null

  // Match /events/:slug or /org/:slug/events/:slug, but exclude static create pages
  let eventSlug = null
  const eventMatch = pathname.match(/^\/events\/([^/]+)/)
  if (eventMatch && eventMatch[1] !== 'create') {
    eventSlug = eventMatch[1]
  } else {
    const orgEventMatch = pathname.match(/^\/org\/[^/]+\/events\/([^/]+)/)
    if (orgEventMatch && orgEventMatch[1] !== 'create-event') {
      eventSlug = orgEventMatch[1]
    }
  }

  // Fetch organization if orgSlug exists
  const { data: orgData } = useQuery({
    enabled: !!orgSlug,
    queryFn: () => getOrganization(orgSlug!),
    queryKey: ['organization', orgSlug],
  })

  // Fetch team if teamSlug exists
  const { data: teamData } = useQuery({
    enabled: !!teamSlug,
    queryFn: () => getTeam(teamSlug!),
    queryKey: ['team', teamSlug],
  })

  // Fetch event if eventSlug exists
  const { data: eventData } = useQuery({
    enabled: !!eventSlug,
    queryFn: () => getEvent(eventSlug!),
    queryKey: ['event', eventSlug],
  })

  const org = orgData?.organization
  const team = teamData?.team
  const event = eventData?.event

  // Determine breadcrumbs
  let crumbs: Array<{
    href?: string
    label: string
    type: 'event' | 'org' | 'team'
  }> = []

  if (eventSlug) {
    if (orgSlug) {
      crumbs = [
        {
          href: `/org/${orgSlug}`,
          label: org?.name || orgSlug,
          type: 'org',
        },
        {
          href: `/org/${orgSlug}/events/${eventSlug}`,
          label: event?.name || eventSlug,
          type: 'event',
        },
      ]
    } else {
      if (event?.organization) {
        crumbs = [
          {
            href: `/org/${event.organization.slug}`,
            label: event.organization.name,
            type: 'org',
          },
          {
            href: `/events/${eventSlug}`,
            label: event.name,
            type: 'event',
          },
        ]
      } else {
        crumbs = [
          {
            href: `/events/${eventSlug}`,
            label: event?.name || eventSlug,
            type: 'event',
          },
        ]
      }
    }
  } else if (teamSlug) {
    if (team) {
      if (team.organization) {
        crumbs = [
          {
            href: `/org/${team.organization.slug}`,
            label: team.organization.name,
            type: 'org',
          },
          {
            href: `/teams/${teamSlug}`,
            label: team.name,
            type: 'team',
          },
        ]
      } else {
        crumbs = [
          {
            href: `/teams/${teamSlug}`,
            label: team.name,
            type: 'team',
          },
        ]
      }
    } else {
      crumbs = [
        {
          href: `/teams/${teamSlug}`,
          label: teamSlug,
          type: 'team',
        },
      ]
    }
  } else if (orgSlug) {
    crumbs = [
      {
        href: `/org/${orgSlug}`,
        label: org?.name || orgSlug,
        type: 'org',
      },
    ]
  } else if (currentOrg) {
    crumbs = [
      {
        href: `/org/${currentOrg.slug}`,
        label: currentOrg.name,
        type: 'org',
      },
    ]
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="font-bold transition-colors hover:text-white">
        Lync
      </Link>

      {crumbs.length > 0 && (
        <Slash className="text-border size-3 shrink-0 -rotate-45" />
      )}

      <div className="flex items-center gap-4">
        {crumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-4">
            {index > 0 && <div className="h-8 w-px bg-white/10" />}
            <div className="flex flex-col justify-center gap-0.5">
              <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                {typeLabels[crumb.type]}
              </span>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-sm font-semibold transition-colors hover:text-white"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-muted-foreground text-sm font-semibold">
                  {crumb.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
