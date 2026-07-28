import type { Team } from '~/interfaces/team-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  teams: Team[]
}

export async function getUserTeams(): Promise<Response> {
  return await api.get('teams').json<Response>()
}
