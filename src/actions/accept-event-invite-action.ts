'use server'

import { HTTPError } from 'ky'
import { acceptEventInvite } from '~/http/accept-event-invite'

export async function acceptEventInviteAction(inviteId: string) {
  try {
    await acceptEventInvite(inviteId)
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
