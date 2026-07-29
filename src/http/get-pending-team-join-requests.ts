import type { PendingTeamJoinRequest } from '~/interfaces/team-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  requests: PendingTeamJoinRequest[]
}

export async function getPendingTeamJoinRequests(): Promise<Response> {
  return await api.get('team-join-requests/pending').json<Response>()
}
