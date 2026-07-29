import { z } from 'zod'
import { createEventSchema } from '~/schemas/event-schemas'
import { Organization } from './organization-interfaces'

export enum PaymentModel {
  FREE = 'FREE',
  PAY_TO_CONFIRM = 'PAY_TO_CONFIRM',
  PAY_TO_REGISTER = 'PAY_TO_REGISTER',
}

export enum SportName {
  BASKETBALL = 'BASKETBALL',
  RUNNING = 'RUNNING',
  SOCCER = 'SOCCER',
  SWIMMING = 'SWIMMING',
}

export type Event = {
  description: string | null
  endDate: string | null
  id: string
  name: string
  organization: Pick<Organization, 'id' | 'name' | 'slug' | 'avatarUrl'> | null
  owner: {
    avatarUrl: string | null
    id: string
    name: string
  }
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
