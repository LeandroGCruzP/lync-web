import type { User } from '~/interfaces/user-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  user: User
}

export async function getProfile(): Promise<Response> {
  return await api.get('profile').json<Response>()
}
