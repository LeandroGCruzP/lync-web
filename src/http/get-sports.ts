import { Sport } from '~/interfaces/sport-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  sports: Sport[]
}

export async function getSports(): Promise<Response> {
  return await api.get('sports').json<Response>()
}
