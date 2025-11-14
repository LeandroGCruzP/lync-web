import { api } from '~/lib/api-client'

export async function shutdownOrganization(orgSlug: string): Promise<void> {
  await api.delete(`organizations/${orgSlug}`)
}
