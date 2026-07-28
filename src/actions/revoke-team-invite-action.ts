'use server'

import { HTTPError } from 'ky'
import { revokeTeamInvite } from '~/http/revoke-team-invite'

export async function revokeTeamInviteAction(inviteId: string) {
  try {
    await revokeTeamInvite(inviteId)
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
