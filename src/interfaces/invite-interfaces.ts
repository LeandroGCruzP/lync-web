import { z } from 'zod'
import { createInviteSchema } from '~/schemas/invite-schemas'
import type { Organization } from './organization-interfaces'
import type { Role } from './role-interfaces'
import type { User } from './user-interfaces'

export type Invite = {
  id: string
  email: string
  role: Role
  createdAt: string
  author: Pick<User, 'id' | 'name' | 'avatarUrl'> | null
  organization: Pick<Organization, 'name'>
}

export type CreateInviteData = z.infer<typeof createInviteSchema>
