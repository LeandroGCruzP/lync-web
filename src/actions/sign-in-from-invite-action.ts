'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signInFromInviteAction(
  inviteId: string,
  inviteEmail: string,
): Promise<void> {
  const cookiesStore = await cookies()
  cookiesStore.set('inviteId', inviteId)

  redirect(`/auth/sign-in?email=${inviteEmail}`)
}
