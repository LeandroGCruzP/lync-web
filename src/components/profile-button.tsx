import { auth } from '~/auth/auth'
import { ProfileDropdown } from './profile-dropdown'

export async function ProfileButton() {
  const { user } = await auth()

  return <ProfileDropdown user={user} />
}
