import type { RecoveryPasswordData } from '~/interfaces/recovery-password-interfaces'
import { api } from '~/lib/api-client'

export async function recoveryPassword(
  data: RecoveryPasswordData,
): Promise<void> {
  await api.post('password/recover', {
    json: {
      email: data.email,
    },
  })
}
