'use server'

import { HTTPError } from 'ky'
import { rejectTeamJoinRequest } from '~/http/reject-team-join-request'

export async function rejectTeamJoinRequestAction(requestId: string) {
  try {
    await rejectTeamJoinRequest(requestId)
    return { success: true }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { message, success: false }
    }
    console.error(err)
    return { message: 'Unexpected error', success: false }
  }
}
