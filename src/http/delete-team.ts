import { api } from '~/lib/api-client'

export async function deleteTeam(id: string): Promise<void> {
  await api.delete(`teams/${id}`)
}
