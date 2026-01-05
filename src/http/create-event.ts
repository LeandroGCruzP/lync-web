import { CreateEventData } from '~/interfaces/event-interfaces'
import { api } from '~/lib/api-client'

export async function createEvent(data: CreateEventData): Promise<void> {
  await api.post('events', {
    json: data,
  })
}
