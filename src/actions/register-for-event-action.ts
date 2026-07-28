'use server'

import { HTTPError } from 'ky'
import { registerForEvent } from '~/http/register-for-event'

export async function registerForEventAction(slug: string, teamId?: string) {
  try {
    const response = await registerForEvent(slug, { teamId })
    return { participantId: response.participantId, success: true }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { message, success: false }
    }
    console.error(err)
    return { message: 'Unexpected error, try again later', success: false }
  }
}
