'use server'

import { redirect } from 'next/navigation'
import { getCurrentOrgSlug } from '~/auth/auth'
import { shutdownOrganization } from '~/http/shutdown-organization'

export async function shutdownOrganizationAction(): Promise<void> {
  const orgSlug = await getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('No organization selected')
  }

  await shutdownOrganization(orgSlug)

  redirect('/')
}
