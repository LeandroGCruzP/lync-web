'use server'

import { getCurrentOrgSlug } from "~/auth/auth"
import { removeMember } from "~/http/remove-member"

export async function removeMemberAction(memberId: string): Promise<void> {
  const orgSlug = await getCurrentOrgSlug()

  await removeMember(orgSlug!, memberId)
}
