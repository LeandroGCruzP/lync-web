'use server'

import { redirect } from 'next/navigation'
import { acceptInvite } from "~/http/accept-invite"

export async function acceptInviteAction(inviteId: string): Promise<void> {
  await acceptInvite(inviteId)

  redirect('/')
}
