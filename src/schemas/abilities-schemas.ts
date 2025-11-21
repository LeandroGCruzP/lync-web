import { z } from 'zod'
import { memberInviteSubject } from '~/subjects/member-invite'
import { organizationSubject } from '~/subjects/organization'
import { userSubject } from '~/subjects/user'

export const AppAbilitiesSchema = z.union([
  userSubject,
  organizationSubject,
  memberInviteSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])
