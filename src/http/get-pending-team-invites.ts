import type { TeamInvite } from '~/interfaces/team-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  invites: TeamInvite[]
}

export async function getPendingTeamInvites(): Promise<Response> {
  return await api.get('team-invites/pending').json<Response>()
}
