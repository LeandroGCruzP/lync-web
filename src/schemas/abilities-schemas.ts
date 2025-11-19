import { z } from 'zod'
import { inviteSubject } from '~/subjects/invite'
import { organizationSubject } from '~/subjects/organization'
import { userSubject } from '~/subjects/user'

export const AppAbilitiesSchema = z.union([
  userSubject,
  organizationSubject,
  inviteSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])
