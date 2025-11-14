'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { signUp } from '~/http/sign-up'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { signUpSchema } from '~/schemas/sign-uo-schemas'

export async function signUpAction(data: FormData): Promise<ActionResponse> {
  const parsedData = signUpSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = parsedData.data

  try {
    await signUp({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  redirect('/auth/sign-in')
}
