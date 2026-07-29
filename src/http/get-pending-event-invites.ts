import type { EventInvite } from '~/interfaces/event-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  invites: EventInvite[]
}

export async function getPendingEventInvites(): Promise<Response> {
  return await api.get('event-invites/pending').json<Response>()
}
