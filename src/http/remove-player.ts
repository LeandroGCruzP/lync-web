import { api } from '~/lib/api-client'

export async function removePlayer(
  teamId: string,
  playerId: string,
): Promise<void> {
  await api.delete(`teams/${teamId}/players/${playerId}`)
}
