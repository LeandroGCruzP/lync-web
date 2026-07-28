import { api } from '~/lib/api-client'

export async function revokeTeamInvite(inviteId: string): Promise<void> {
  await api.delete(`team-invites/${inviteId}`)
}
