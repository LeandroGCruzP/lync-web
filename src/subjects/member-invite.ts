import { z } from 'zod'

export const memberInviteSubject = z.tuple([
  z.union([
    z.literal('manage'), // 'manage' is required to casl
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.literal('MemberInvite'),
])

export type MemberInviteSubject = z.infer<typeof memberInviteSubject>
