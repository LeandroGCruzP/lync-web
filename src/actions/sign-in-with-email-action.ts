'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { acceptInvite } from '~/http/accept-invite'
import { signInWithEmail } from '~/http/sign-in-with-email'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { signInWithEmailSchema } from '~/schemas/sing-in-schemas'

export async function signInWithEmailAction(data: FormData): Promise<ActionResponse> {
  const parsedData = signInWithEmailSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = parsedData.data

  try {
    const { token } = await signInWithEmail({
      email,
      password,
    })

    const cookiesStore = await cookies()
    cookiesStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const inviteId = cookiesStore.get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite(inviteId)
        cookiesStore.delete('inviteId')
      } catch {}
    }
  } catch (err) {
    const isAPIError = err instanceof HTTPError
    if (isAPIError) {
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

  redirect('/')
}
