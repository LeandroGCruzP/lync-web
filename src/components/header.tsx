import { getCurrentOrgSlug } from '~/auth/auth'
import { getOrganizations } from '~/http/get-organizations'
import { HeaderBreadcrumbs } from './header-breadcrumbs'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const orgSlug = await getCurrentOrgSlug()
  let currentOrg = null

  if (orgSlug) {
    try {
      const { organizations } = await getOrganizations()
      currentOrg = organizations.find((org) => org.slug === orgSlug) || null
    } catch (error) {
      console.error('Failed to fetch organizations in Header:', error)
    }
  }

  return (
    <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between rounded-2xl border border-white/5 bg-white/2 px-6 backdrop-blur-md">
      <HeaderBreadcrumbs currentOrg={currentOrg} />

      <div className="flex items-center gap-4">
        <PendingInvites />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
