import { Event } from '~/interfaces/event-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  events: Event[]
}

interface GetEventsRequest {
  filter?: 'standalone'
  organizationSlug?: string
}

export async function getEvents({
  filter,
  organizationSlug,
}: GetEventsRequest): Promise<Response> {
  const searchParams = new URLSearchParams()

  if (filter) {
    searchParams.set('filter', filter)
  }

  if (organizationSlug) {
    searchParams.set('organizationSlug', organizationSlug)
  }

  return await api.get('events', { searchParams }).json<Response>()
}
