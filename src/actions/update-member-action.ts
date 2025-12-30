'use server'

import { getCurrentOrgSlug } from '~/auth/auth'
import { updateMemberRole } from '~/http/update-member-role'
import type { ActionResponse } from '~/interfaces/actions-interfaces'
import type { Role } from '~/interfaces/role-interfaces'

export async function updateMemberAction(
  memberId: string,
  role: Role,
): Promise<ActionResponse> {
  const orgSlug = await getCurrentOrgSlug()

  if (!orgSlug) {
    throw new Error('No organization selected')
  }

  await updateMemberRole(orgSlug, memberId, { role })

  return {
    errors: null,
    message: 'Member updated successfully',
    success: true,
  }
}
