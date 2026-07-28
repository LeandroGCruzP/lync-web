import type { TeamRole } from '~/interfaces/team-interfaces'
import { api } from '~/lib/api-client'

interface Request {
  email: string
  role: TeamRole
}

interface Response {
  inviteId: string
}

export async function inviteTeamMember(
  teamId: string,
  body: Request,
): Promise<Response> {
  return await api
    .post(`teams/${teamId}/invites`, { json: body })
    .json<Response>()
}
