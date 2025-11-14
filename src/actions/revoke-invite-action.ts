'use server'

import { getCurrentOrgSlug } from "~/auth/auth"
import { revokeInvite } from "~/http/revoke-invite"

export async function revokeInviteAction(inviteId: string): Promise<void> {
  const orgSlug = await getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('No organization selected')
  }

  await revokeInvite(orgSlug, inviteId)
}
