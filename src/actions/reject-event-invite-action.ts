'use server'

import { HTTPError } from 'ky'
import { rejectEventInvite } from '~/http/reject-event-invite'

export async function rejectEventInviteAction(inviteId: string) {
  try {
    await rejectEventInvite(inviteId)
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
