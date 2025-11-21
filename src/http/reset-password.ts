import { ResetPasswordData } from '~/interfaces/reset-password-interfaces'
import { api } from '~/lib/api-client'

export async function resetPassword(data: ResetPasswordData): Promise<void> {
  console.log(
    `🟢 Resetting password from: ${data.code} - password: ${data.password}`,
  )
  await api.post('password/reset', {
    json: {
      code: data.code,
      password: data.password,
    },
  })
}
