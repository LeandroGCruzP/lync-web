import { auth } from '~/auth/auth'
import { getPendingTeamInvites } from '~/http/get-pending-team-invites'
import { ProfileDropdown } from './profile-dropdown'

export async function ProfileButton() {
  const { user } = await auth()

  let pendingInvitesCount = 0
  try {
    const { invites } = await getPendingTeamInvites()
    pendingInvitesCount = invites.length
  } catch (error) {
    console.error('Failed to fetch pending team invites count:', error)
  }

  return <ProfileDropdown user={user} invitesCount={pendingInvitesCount} />
}
