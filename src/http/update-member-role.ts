import type { UpdateMemberData } from '~/interfaces/member-interfaces'
import { api } from '~/lib/api-client'

export async function updateMemberRole(
  orgSlug: string,
  memberId: string,
  data: UpdateMemberData,
): Promise<void> {
  await api.patch(`organizations/${orgSlug}/members/${memberId}`, {
    json: {
      role: data.role,
    },
  })
}
