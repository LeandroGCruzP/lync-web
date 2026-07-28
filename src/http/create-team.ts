import { api } from '~/lib/api-client'

interface Request {
  avatarUrl?: string | null
  description?: string
  name: string
  organizationId?: string | null
}

interface Response {
  teamId: string
}

export async function createTeam(body: Request): Promise<Response> {
  return await api.post('teams', { json: body }).json<Response>()
}
