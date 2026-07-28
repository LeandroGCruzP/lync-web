'use server'

import { HTTPError } from 'ky'
import { acceptTeamInvite } from '~/http/accept-team-invite'

export async function acceptTeamInviteAction(inviteId: string) {
  try {
    await acceptTeamInvite(inviteId)
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
