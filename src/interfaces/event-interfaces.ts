import { z } from 'zod'
import { createEventSchema } from '~/schemas/event-schemas'
import { Organization } from './organization-interfaces'

export enum PaymentModel {
  FREE = 'FREE',
  PAY_TO_CONFIRM = 'PAY_TO_CONFIRM',
  PAY_TO_REGISTER = 'PAY_TO_REGISTER',
}

export type Event = {
  description: string | null
  endDate: string | null
  id: string
  name: string
  organization: Pick<Organization, 'id' | 'name' | 'slug' | 'avatarUrl'> | null
  paymentModel: PaymentModel
  playersPerTeam: number | null
  price: number | null
  slots: number | null
  slug: string
  sport: {
    id: string
    name: string
  } | null
  startDate: string
}

export type CreateEventData = z.infer<typeof createEventSchema>
