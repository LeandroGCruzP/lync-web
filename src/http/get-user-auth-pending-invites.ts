import type { Invite } from '~/interfaces/invite-interfaces'
import { api } from '~/lib/api-client'

export type Response = {
  invites: Invite[]
}

export async function getUserAuthPendingInvites(): Promise<Response> {
  return await api.get('pending-invites').json<Response>()
}
