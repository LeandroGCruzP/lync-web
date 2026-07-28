import { api } from '~/lib/api-client'

export async function acceptTeamInvite(inviteId: string): Promise<void> {
  await api.post(`team-invites/${inviteId}/accept`)
}
