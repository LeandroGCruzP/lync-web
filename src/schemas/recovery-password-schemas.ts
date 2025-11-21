import { z } from 'zod'

export const recoveryPasswordSchema = z.object({
  email: z.email({ message: 'Please, provide a valid e-mail address' }),
})
