import type { Role } from './role-interfaces'

export type Member = {
  avatarUrl: string | null
  email: string
  id: string
  name: string | null
  role: Role
  userId: string
}

export type UpdateMemberData = {
  role: Role
}
