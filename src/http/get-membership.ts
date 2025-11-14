import type { Membership } from '~/interfaces/membership-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  membership: Membership
}

export async function getMembership(orgSlug: string): Promise<Response> {
  return await api
    .get(`organizations/${orgSlug}/membership`)
    .json<Response>()
}
