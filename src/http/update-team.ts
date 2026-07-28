import { api } from '~/lib/api-client'

interface Request {
  avatarUrl?: string | null
  description?: string
  name: string
}

export async function updateTeam(id: string, body: Request): Promise<void> {
  await api.put(`teams/${id}`, { json: body })
}
