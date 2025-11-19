'use server'

import { HTTPError } from 'ky'
import { getCurrentOrgSlug } from '~/auth/auth'
import { updateOrganization } from '~/http/update-organization'
import { createOrganizationSchema } from '~/schemas/organization-schemas'

export async function updateOrganizationAction(data: FormData) {
  const parsedData = createOrganizationSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { errors, message: null, success: false }
  }

  const { domain, name, shouldAttachUsersByDomain } = parsedData.data
  const orgSlug = await getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('No organization selected')
  }

  try {
    await updateOrganization(orgSlug, {
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
    message: 'Organization updated successfully',
    success: true,
  }
}
