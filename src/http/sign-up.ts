import type { SignUpData } from '~/interfaces/sign-up-interfaces'
import { api } from '~/lib/api-client'

export async function signUp(data: SignUpData): Promise<void> {
  await api.post('users', {
    json: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  })
}
