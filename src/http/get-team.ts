import type { Team } from '~/interfaces/team-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  team: Team
}

export async function getTeam(slug: string): Promise<Response> {
  return await api.get(`teams/${slug}`).json<Response>()
}
