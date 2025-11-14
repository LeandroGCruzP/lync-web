import { z } from 'zod'
import { createOrganizationSchema } from '~/schemas/organization-schemas'

export type Organization = {
  id: string
  name: string
  slug: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
  ownerId: string
}

export type CreateOrganizationData = z.infer<typeof createOrganizationSchema>
export type UpdateOrganizationData = z.infer<typeof createOrganizationSchema>
