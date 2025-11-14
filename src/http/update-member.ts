import type { UpdateMemberData } from '~/interfaces/member-interfaces'
import { api } from '~/lib/api-client'

export async function updateMember(orgSlug: string, memberId: string, data: UpdateMemberData): Promise<void> {
  await api.put(`organizations/${orgSlug}/members/${memberId}`, {
    json: {
      role: data.role
    },
  })
}

