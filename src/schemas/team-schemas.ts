import { z } from 'zod'

export const createTeamSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  organizationId: z.string().uuid().nullish(),
})

export const inviteTeamMemberSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['ADMIN', 'PLAYER']),
})
