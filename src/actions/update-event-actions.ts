'use server'

import { HTTPError } from 'ky'
import { updateEvent } from '~/http/update-event'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { updateEventSchema } from '~/schemas/event-schemas'
import { cleanFormData } from '~/utils/clean-form-data'

export async function updateEventAction(
  eventId: string,
  data: FormData,
): Promise<ActionResponse> {
  const cleanedData = cleanFormData(data)
  const parsedData = updateEventSchema.safeParse(cleanedData)

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { errors, message: null, success: false }
  }

  const {
    accessType,
    description,
    endDate,
    name,
    paymentModel,
    playersPerTeam,
    price,
    slots,
    sportId,
    startDate,
  } = parsedData.data

  try {
    await updateEvent(eventId, {
      accessType,
      description: description || null,
      endDate: endDate || null,
      name,
      paymentModel,
      playersPerTeam: playersPerTeam || null,
      price: price || null,
      slots: slots || null,
      sportId: sportId || null,
      startDate,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { errors, message } = await err.response.json()

      console.error(message, errors)

      return { errors: errors ?? null, message, success: false }
    }

    console.error(err)

    return {
      errors: null,
      message: 'Unexpected error, try again in a few minutes',
      success: false,
    }
  }

  return {
    errors: null,
    message: 'Event updated successfully',
    success: true,
  }
}
