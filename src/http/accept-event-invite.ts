import { api } from '~/lib/api-client'

export async function acceptEventInvite(inviteId: string): Promise<void> {
  await api.post(`event-invites/${inviteId}/accept`)
}
