import { z } from 'zod'
import { createInviteSchema } from '~/schemas/invite-schemas'
import type { Organization } from './organization-interfaces'
import type { Role } from './role-interfaces'
import type { User } from './user-interfaces'

export type Invite = {
  author: Pick<User, 'id' | 'name' | 'avatarUrl'> | null
  createdAt: string
  email: string
  id: string
  organization: Pick<Organization, 'name'>
  role: Role
}

export type CreateInviteData = z.infer<typeof createInviteSchema>
