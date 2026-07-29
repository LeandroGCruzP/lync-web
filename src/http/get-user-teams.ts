import type { Team } from '~/interfaces/team-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  teams: Team[]
}

interface GetUserTeamsRequest {
  filter?: 'standalone'
  organizationSlug?: string
}

export async function getUserTeams(
  params?: GetUserTeamsRequest,
): Promise<Response> {
  const searchParams = new URLSearchParams()

  if (params?.filter) {
    searchParams.set('filter', params.filter)
  }

  if (params?.organizationSlug) {
    searchParams.set('organizationSlug', params.organizationSlug)
  }

  return await api.get('teams', { searchParams }).json<Response>()
}
