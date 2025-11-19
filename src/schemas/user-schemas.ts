import { z } from 'zod'
import { roleSchema } from './role-schemas'

export const userSchema = z.object({
  id: z.string(),
  role: roleSchema,
})
