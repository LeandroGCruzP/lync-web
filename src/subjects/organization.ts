import { z } from 'zod'
import { organizationAuthSchema } from '~/schemas/organization-schemas'

export const organizationSubject = z.tuple([
  z.union([
    z.literal('manage'), // 'manage' is required to casl
    z.literal('update'),
    z.literal('delete'),
    z.literal('transfer_ownership'),
  ]),
  z.union([z.literal('Organization'), organizationAuthSchema]),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
