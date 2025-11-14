import { api } from '~/lib/api-client'

export async function revokeInvite(orgSlug: string, inviteId: string): Promise<void> {
  await api.delete(`organizations/${orgSlug}/invites/${inviteId}`)
}
