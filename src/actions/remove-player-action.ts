'use server'

import { HTTPError } from 'ky'
import { removePlayer } from '~/http/remove-player'

export async function removePlayerAction(teamId: string, playerId: string) {
  try {
    await removePlayer(teamId, playerId)
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
