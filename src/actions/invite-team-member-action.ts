'use server'

import { HTTPError } from 'ky'
import { inviteTeamMember } from '~/http/invite-team-member'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { inviteTeamMemberSchema } from '~/schemas/team-schemas'

export async function inviteTeamMemberAction(
  teamId: string,
  data: FormData,
): Promise<ActionResponse> {
  const parsedData = inviteTeamMemberSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors
    return { errors, message: null, success: false }
  }

  const { email, role } = parsedData.data

  try {
    await inviteTeamMember(teamId, {
      email,
      role,
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

  return {
    errors: null,
    message: 'Invite created successfully',
    success: true,
  }
}
