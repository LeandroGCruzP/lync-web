import { Event } from '~/interfaces/event-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  events: Event[]
}

interface GetEventsRequest {
  filter?: 'standalone'
  organizationSlug?: string
  teamSlug?: string
}

export async function getEvents({
  filter,
  organizationSlug,
  teamSlug,
}: GetEventsRequest): Promise<Response> {
  const searchParams = new URLSearchParams()

  if (filter) {
    searchParams.set('filter', filter)
  }

  if (organizationSlug) {
    searchParams.set('organizationSlug', organizationSlug)
  }

  if (teamSlug) {
    searchParams.set('teamSlug', teamSlug)
  }

  return await api.get('events', { searchParams }).json<Response>()
}
