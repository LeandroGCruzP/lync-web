import { api } from '~/lib/api-client'

export async function rejectInvite(inviteId: string): Promise<void> {
  await api.delete(`invites/${inviteId}/reject`)
}
