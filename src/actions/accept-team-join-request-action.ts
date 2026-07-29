'use server'

import { HTTPError } from 'ky'
import { acceptTeamJoinRequest } from '~/http/accept-team-join-request'

export async function acceptTeamJoinRequestAction(requestId: string) {
  try {
    await acceptTeamJoinRequest(requestId)
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
