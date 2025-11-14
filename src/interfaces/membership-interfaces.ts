import type { Role } from "./role-interfaces"

export type Membership = {
  id: string
  role: Role
  userId: string
  avatarUrl: string | null
}
