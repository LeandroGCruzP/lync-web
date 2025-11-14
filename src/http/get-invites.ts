import type { Invite } from '~/interfaces/invite-interfaces'
import type { User } from '~/interfaces/user-interfaces'
import { api } from '~/lib/api-client'

interface Response {
  invites: (Omit<Invite, 'author'> & {
    author: Pick<User, 'id' | 'name'> | null
  })[]
}

export async function getInvites(orgSlug: string): Promise<Response> {
  return await api
    .get(`organizations/${orgSlug}/invites`)
    .json<Response>()
}
