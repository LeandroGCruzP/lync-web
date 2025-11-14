import type { CreateOrganizationData } from '~/interfaces/organization-interfaces'
import { api } from '~/lib/api-client'

export async function createOrganization(data: CreateOrganizationData): Promise<void> {
  await api.post('organizations', {
    json: {
      name: data.name,
      domain: data.domain,
      shouldAttachUsersByDomain: data.shouldAttachUsersByDomain,
    },
  })
}
