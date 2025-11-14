import type { SignUpData } from '~/interfaces/sign-up-interfaces'
import { api } from '~/lib/api-client'

export async function signUp(data: SignUpData): Promise<void> {
  await api.post('users', {
    json: {
      email: data.email,
      name: data.name,
      password: data.password,
    },
  })
}
