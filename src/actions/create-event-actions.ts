'use server'

import { HTTPError } from 'ky'
import { createEvent } from '~/http/create-event'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { createEventSchema } from '~/schemas/event-schemas'
import { cleanFormData } from '~/utils/clean-form-data'

export async function createEventAction(
  data: FormData,
): Promise<ActionResponse> {
  const cleanedData = cleanFormData(data)
  const parsedData = createEventSchema.safeParse(cleanedData)

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { errors, message: null, success: false }
  }

  const {
    description,
    endDate,
    name,
    organizationId,
    paymentModel,
    playersPerTeam,
    price,
    slots,
    sportId,
    startDate,
  } = parsedData.data

  try {
    await createEvent({
      description: description,
      endDate: endDate,
      name,
      organizationId: organizationId,
      paymentModel,
      playersPerTeam: playersPerTeam,
      price: price,
      slots: slots,
      sportId: sportId,
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
    message: 'Event created successfully',
    success: true,
  }
}
