import { z } from 'zod'

export const teamSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('invite_member'),
    z.literal('remove_member'),
  ]),
  z.literal('Team'),
])
