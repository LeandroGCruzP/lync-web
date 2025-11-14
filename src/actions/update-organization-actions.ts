'use server'

import { HTTPError } from 'ky'
import { getCurrentOrgSlug } from '~/auth/auth'

import { updateOrganization } from '~/http/update-organization'
import { createOrganizationSchema } from '~/schemas/organization-schemas'

export async function updateOrganizationAction(data: FormData) {
  const parsedData = createOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = parsedData.data
  const orgSlug = await getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('No organization selected')
  }

  try {
    await updateOrganization(orgSlug, {
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
    message: 'Organization updated successfully',
    errors: null,
  }
}
