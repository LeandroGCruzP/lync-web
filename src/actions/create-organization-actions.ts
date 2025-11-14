'use server'

import { HTTPError } from 'ky'
import { createOrganization } from '~/http/create-organization'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import { createOrganizationSchema } from '~/schemas/organization-schemas'

export async function createOrganizationAction(data: FormData): Promise<ActionResponse> {
  const parsedData = createOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = parsedData.data

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Organization created successfully',
    errors: null,
  }
}
