'use server'

import { HTTPError } from 'ky'
import { createTeamJoinRequest } from '~/http/create-team-join-request'

export async function createTeamJoinRequestAction(teamId: string) {
  try {
    const data = await createTeamJoinRequest(teamId)
    return { requestId: data.requestId, success: true }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { message, success: false }
    }
    console.error(err)
    return { message: 'Unexpected error', success: false }
  }
}
