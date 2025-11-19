'use server'

import { redirect } from 'next/navigation'
import { rejectInvite } from '~/http/reject-invite'

export async function rejectInviteAction(inviteId: string): Promise<void> {
  await rejectInvite(inviteId)

  redirect('/')
}
