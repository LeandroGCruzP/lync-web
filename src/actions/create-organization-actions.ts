'use server'

import { HTTPError } from 'ky'
import { createOrganization } from '~/http/create-organization'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { createOrganizationSchema } from '~/schemas/organization-schemas'

export async function createOrganizationAction(data: FormData): Promise<ActionResponse> {
  const parsedData = createOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { errors, message: null, success: false }
  }

  const { domain, name, shouldAttachUsersByDomain } = parsedData.data

  try {
    await createOrganization({
      domain,
      name,
      shouldAttachUsersByDomain,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { errors: null, message, success: false }
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
    message: 'Organization created successfully',
    success: true,
  }
}
