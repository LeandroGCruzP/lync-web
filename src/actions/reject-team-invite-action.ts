'use server'

import { HTTPError } from 'ky'
import { rejectTeamInvite } from '~/http/reject-team-invite'

export async function rejectTeamInviteAction(inviteId: string) {
  try {
    await rejectTeamInvite(inviteId)
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
