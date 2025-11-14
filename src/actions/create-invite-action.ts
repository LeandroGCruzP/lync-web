'use server'

import { HTTPError } from 'ky'
import { getCurrentOrgSlug } from '~/auth/auth'
import { createInvite } from '~/http/create-invite'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { createInviteSchema } from '~/schemas/invite-schemas'

export async function createInviteAction(data: FormData): Promise<ActionResponse> {
  const parsedData = createInviteSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, role } = parsedData.data
  const orgSlug = await getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('No organization selected')
  }

  try {
    await createInvite(orgSlug, {
      email,
      role,
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

  return {
    success: true,
    message: 'Invite created successfully',
    errors: null,
  }
}
