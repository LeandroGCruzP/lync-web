import type { Role } from "./role-interfaces"

export type Member = {
  id: string
  userId: string
  role: Role
  name: string | null
  email: string
  avatarUrl: string | null
}

export type UpdateMemberData = {
  role: Role
}
