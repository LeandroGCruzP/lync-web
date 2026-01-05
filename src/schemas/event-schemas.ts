import { z } from 'zod'
import { PaymentModel } from '~/interfaces/event-interfaces'
import { ISODate } from '~/utils/zod-utils'

export const createEventSchema = z.object({
  description: z.string().optional(),
  endDate: ISODate.optional(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  organizationId: z.uuid().optional(),
  paymentModel: z.enum(PaymentModel).default(PaymentModel.FREE),
  playersPerTeam: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  slots: z.coerce.number().optional(),
  sportId: z.uuid().optional(),
  startDate: ISODate,
})
