'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { resetPassword } from '~/http/reset-password'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { resetPasswordSchema } from '~/schemas/reset-password-schemas'

export async function resetPasswordAction(
  data: FormData,
): Promise<ActionResponse> {
  const parsedData = resetPasswordSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { errors, message: null, success: false }
  }

  const { code, password } = parsedData.data

  try {
    await resetPassword({
      code,
      password,
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

  redirect('/auth/sign-in')
}
