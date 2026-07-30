import { z } from 'zod'
import { createEventSchema, updateEventSchema } from '~/schemas/event-schemas'
import { Organization } from './organization-interfaces'

export enum PaymentModel {
  FREE = 'FREE',
  PAY_TO_CONFIRM = 'PAY_TO_CONFIRM',
  PAY_TO_REGISTER = 'PAY_TO_REGISTER',
}

export enum EventAccessType {
  INVITE_ONLY = 'INVITE_ONLY',
  MEMBERS_ONLY = 'MEMBERS_ONLY',
  PUBLIC_OPEN = 'PUBLIC_OPEN',
  PUBLIC_READ_ONLY = 'PUBLIC_READ_ONLY',
}

export enum SportName {
  BASKETBALL = 'BASKETBALL',
  RUNNING = 'RUNNING',
  SOCCER = 'SOCCER',
  SWIMMING = 'SWIMMING',
}

export type Event = {
  accessType: EventAccessType
  description: string | null
  endDate: string | null
  id: string
  name: string
  organization: Pick<Organization, 'id' | 'name' | 'slug' | 'avatarUrl'> | null
  owner?: {
    avatarUrl: string | null
    id: string
    name: string
  }
  ownerId: string
  paymentModel: PaymentModel
  playersPerTeam: number | null
  price: number | null
  slots: number | null
  slug: string
  sport: {
    id: string
    name: SportName
  } | null
  startDate: string
}

export type CreateEventData = z.infer<typeof createEventSchema>
export type UpdateEventData = z.infer<typeof updateEventSchema>

export type EventInvite = {
  author: {
    avatarUrl: string | null
    id: string
    name: string | null
  } | null
  createdAt: string
  email: string
  event: {
    id: string
    name: string
    slug: string
  }
  id: string
  role: 'ADMIN' | 'PARTICIPANT'
}
