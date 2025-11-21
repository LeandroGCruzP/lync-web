'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { signUp } from '~/http/sign-up'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { signUpSchema } from '~/schemas/sign-up-schemas'

export async function signUpAction(data: FormData): Promise<ActionResponse> {
  const parsedData = signUpSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { errors, message: null, success: false }
  }

  const { email, name, password } = parsedData.data

  try {
    await signUp({
      email,
      name,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
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
