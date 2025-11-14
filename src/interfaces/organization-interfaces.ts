import { z } from 'zod'
import { createOrganizationSchema } from '~/schemas/organization-schemas'

export type Organization = {
  avatarUrl: string | null
  createdAt: string
  domain: string | null
  id: string
  name: string
  ownerId: string
  shouldAttachUsersByDomain: boolean
  slug: string
  updatedAt: string
}

export type CreateOrganizationData = z.infer<typeof createOrganizationSchema>
export type UpdateOrganizationData = z.infer<typeof createOrganizationSchema>
