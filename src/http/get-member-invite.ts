import type { Invite } from '~/interfaces/invite-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  invite: Invite
}

export async function getMemberInvite(inviteId: string): Promise<Response> {
  return await api.get(`member-invites/${inviteId}`).json<Response>()
}
