import { auth, getCurrentOrgSlug } from '~/auth/auth'
import { getOrganizations } from '~/http/get-organizations'
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

  let organizations: any[] = []
  let orgSlug: string | null = null
  try {
    const orgsResult = await getOrganizations()
    organizations = orgsResult.organizations
    orgSlug = await getCurrentOrgSlug()
  } catch (error) {
    console.error('Failed to fetch organizations:', error)
  }

  return (
    <ProfileDropdown
      user={user}
      invitesCount={pendingInvitesCount}
      organizations={organizations}
      orgSlug={orgSlug}
    />
  )
}
