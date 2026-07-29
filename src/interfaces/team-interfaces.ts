import { Organization } from './organization-interfaces'
import { User } from './user-interfaces'

export type TeamRole = 'ADMIN' | 'PLAYER'

export interface TeamInvite {
  author?: {
    avatarUrl: string | null
    id: string
    name: string
  } | null
  authorId: string | null
  createdAt: string
  email: string
  id: string
  role: TeamRole
  team?: {
    avatarUrl: string | null
    id: string
    name: string
    slug: string
  }
}

export interface Player {
  id: string
  joinedAt: string
  role: TeamRole
  user: User
  userId: string
}

export interface Team {
  _count?: {
    players: number
  }
  avatarUrl: string | null
  createdAt: string
  description: string | null
  id: string
  invites?: TeamInvite[]
  joinRequests?: TeamJoinRequest[]
  name: string
  organization?: Pick<Organization, 'id' | 'name' | 'slug' | 'avatarUrl'> | null
  owner: User
  ownerId: string
  players: Player[]
  slug: string
  userJoinRequest?: {
    createdAt: string
    id: string
  } | null
}

export interface TeamJoinRequest {
  createdAt: string
  id: string
  user: User
  userId: string
}
