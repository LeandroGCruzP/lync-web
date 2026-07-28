'use server'

import { HTTPError } from 'ky'
import { updateTeam } from '~/http/update-team'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { createTeamSchema } from '~/schemas/team-schemas'

export async function updateTeamAction(
  teamId: string,
  data: FormData,
): Promise<ActionResponse> {
  const parsedData = createTeamSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors
    return { errors, message: null, success: false }
  }

  const { description, name } = parsedData.data

  try {
    await updateTeam(teamId, {
      description,
      name,
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
    message: 'Team updated successfully',
    success: true,
  }
}
