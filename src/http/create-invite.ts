import type { CreateInviteData } from '~/interfaces/invite-interfaces'
import { api } from '~/lib/api-client'

export async function createInvite(
  orgSlug: string,
  data: CreateInviteData,
): Promise<void> {
  await api.post(`organizations/${orgSlug}/invites`, {
    json: {
      email: data.email,
      role: data.role,
    },
  })
}
