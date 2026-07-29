import { api } from '~/lib/api-client'

interface Response {
  requestId: string
}

export async function createTeamJoinRequest(teamId: string): Promise<Response> {
  return await api.post(`teams/${teamId}/join-requests`).json<Response>()
}
