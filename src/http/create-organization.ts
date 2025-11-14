import type { CreateOrganizationData } from '~/interfaces/organization-interfaces'
import { api } from '~/lib/api-client'

export async function createOrganization(data: CreateOrganizationData): Promise<void> {
  await api.post('organizations', {
    json: {
      domain: data.domain,
      name: data.name,
      shouldAttachUsersByDomain: data.shouldAttachUsersByDomain,
    },
  })
}
