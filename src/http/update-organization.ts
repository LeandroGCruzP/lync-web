import type { UpdateOrganizationData } from '~/interfaces/organization-interfaces'
import { api } from '~/lib/api-client'

export async function updateOrganization(orgSlug: string, data: UpdateOrganizationData): Promise<void> {
  await api.put(`organizations/${orgSlug}`, {
    json: {
      domain: data.domain,
      name: data.name,
      shouldAttachUsersByDomain: data.shouldAttachUsersByDomain,
    },
  })
}
