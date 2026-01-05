import { Event } from '~/interfaces/event-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  events: Event[]
}

export async function getEvents(): Promise<Response> {
  return await api.get('events').json<Response>()
}
