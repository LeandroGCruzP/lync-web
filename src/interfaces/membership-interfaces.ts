import type { Role } from "./role-interfaces"

export type Membership = {
  avatarUrl: string | null
  id: string
  role: Role
  userId: string
}
