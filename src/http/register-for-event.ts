import { api } from '~/lib/api-client'

interface Request {
  teamId?: string
}

interface Response {
  participantId: string
}

export async function registerForEvent(
  slug: string,
  body?: Request,
): Promise<Response> {
  return await api
    .post(`events/${slug}/register`, { json: body ?? {} })
    .json<Response>()
}
