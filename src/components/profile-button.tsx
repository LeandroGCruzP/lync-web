import { auth, getCurrentOrgSlug } from '~/auth/auth'
import { getOrganizations } from '~/http/get-organizations'
import { getUserTeams } from '~/http/get-user-teams'
import { ProfileDropdown } from './profile-dropdown'

export async function ProfileButton() {
  const { user } = await auth()

  let organizations: any[] = []
  let orgSlug: string | null = null
  try {
    const orgsResult = await getOrganizations()
    organizations = orgsResult.organizations
    orgSlug = await getCurrentOrgSlug()
  } catch (error) {
    console.error('Failed to fetch organizations:', error)
  }

  let teams: any[] = []
  try {
    const teamsResult = await getUserTeams()
    teams = teamsResult.teams
  } catch (error) {
    console.error('Failed to fetch user teams:', error)
  }

  return (
    <ProfileDropdown
      user={user}
      organizations={organizations}
      orgSlug={orgSlug}
      teams={teams}
    />
  )
}
