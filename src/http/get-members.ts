import type { Member } from '~/interfaces/member-interfaces';
import { api } from '~/lib/api-client';

interface Response {
  members: Member[]
}

export async function getMembers(orgSlug: string): Promise<Response> {
  return await api
    .get(`organizations/${orgSlug}/members`)
    .json<Response>()
}
