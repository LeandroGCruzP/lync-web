import { Event } from '~/interfaces/event-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  event: Event
  isRegistered: boolean
}

export async function getEvent(slug: string): Promise<Response> {
  return await api.get(`events/${slug}`).json<Response>()
}
