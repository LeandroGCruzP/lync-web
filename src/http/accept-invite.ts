import { api } from '~/lib/api-client'

export async function acceptMemberInvite(inviteId: string): Promise<void> {
  await api.post(`member-invites/${inviteId}/accept`)
}
