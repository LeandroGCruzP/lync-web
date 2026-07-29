import { api } from '~/lib/api-client'

export async function acceptTeamJoinRequest(requestId: string): Promise<void> {
  await api.post(`join-requests/${requestId}/accept`)
}
