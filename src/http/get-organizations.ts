import type { Organization } from '~/interfaces/organization-interfaces'
import type { Role } from '~/interfaces/role-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  organizations: (Pick<Organization, 'id' | 'name' | 'slug' | 'avatarUrl'> & {
    role: Role
  })[]
}

export async function getOrganizations(): Promise<Response> {
  return await api.get('organizations').json<Response>()
}
