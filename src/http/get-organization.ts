import type { Organization } from '~/interfaces/organization-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  organization: Organization
}

export async function getOrganization(orgSlug: string): Promise<Response> {
  return await api
    .get(`organizations/${orgSlug}`)
    .json<Response>()
}
