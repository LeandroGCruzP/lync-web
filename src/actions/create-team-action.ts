'use server'

import { HTTPError } from 'ky'
import { createTeam } from '~/http/create-team'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { createTeamSchema } from '~/schemas/team-schemas'

export async function createTeamAction(
  data: FormData,
): Promise<ActionResponse> {
  const parsedData = createTeamSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors
    return { errors, message: null, success: false }
  }

  const { description, name, organizationId } = parsedData.data

  try {
    await createTeam({
      description,
      name,
      organizationId,
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
    message: 'Team created successfully',
    success: true,
  }
}
