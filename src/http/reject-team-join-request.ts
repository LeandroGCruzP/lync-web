import { api } from '~/lib/api-client'

export async function rejectTeamJoinRequest(requestId: string): Promise<void> {
  await api.post(`join-requests/${requestId}/reject`)
}
