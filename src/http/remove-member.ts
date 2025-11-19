import { api } from '~/lib/api-client'

export async function removeMember(
  orgSlug: string,
  memberId: string,
): Promise<void> {
  await api.delete(`organizations/${orgSlug}/members/${memberId}`)
}
