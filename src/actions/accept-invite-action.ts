'use server'

import { redirect } from 'next/navigation'
import { acceptMemberInvite } from '~/http/accept-invite'

export async function acceptInviteAction(inviteId: string): Promise<void> {
  await acceptMemberInvite(inviteId)

  redirect('/')
}
