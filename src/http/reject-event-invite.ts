import { api } from '~/lib/api-client'

export async function rejectEventInvite(inviteId: string): Promise<void> {
  await api.post(`event-invites/${inviteId}/reject`)
}
