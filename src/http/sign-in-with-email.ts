import type { SignInWithEmailData } from '~/interfaces/sign-in-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  token: string
}

export async function signInWithEmail(data: SignInWithEmailData): Promise<Response> {
  return await api.post('sessions/password', {
    json: {
      email: data.email,
      password: data.password,
    }
  }).json<Response>()
}
