'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { recoveryPassword } from '~/http/recovery-password'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { recoveryPasswordSchema } from '~/schemas/recovery-password-schemas'

export async function recoveryPasswordAction(
  data: FormData,
): Promise<ActionResponse> {
  const parsedData = recoveryPasswordSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { errors, message: null, success: false }
  }

  const { email } = parsedData.data

  try {
    await recoveryPassword({
      email,
    })
  } catch (err) {
    const isAPIError = err instanceof HTTPError
    if (isAPIError) {
      const { message } = await err.response.json()

      return { errors: null, message, success: false }
    }

    console.error(err)

    return {
      errors: null,
      message: 'Unexpected error, try again in a few minutes',
      success: false,
    }
  }

  redirect('/')
}
