import { api } from '~/lib/api-client'

export async function rejectTeamInvite(inviteId: string): Promise<void> {
  await api.post(`team-invites/${inviteId}/reject`)
}
