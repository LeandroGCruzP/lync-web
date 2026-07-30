import Link from 'next/link'
import { getCurrentOrgSlug, isAuthenticated } from '~/auth/auth'
import { getOrganizations } from '~/http/get-organizations'
import { HeaderBreadcrumbs } from './header-breadcrumbs'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export async function Header() {
  const isLogged = await isAuthenticated()
  const orgSlug = isLogged ? await getCurrentOrgSlug() : null
  let currentOrg = null

  if (isLogged && orgSlug) {
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
        {isLogged ? (
          <>
            <PendingInvites />
            <Separator orientation="vertical" className="h-5" />
            <ProfileButton />
          </>
        ) : (
          <Button
            asChild
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5"
          >
            <Link href="/auth/sign-in">Entrar</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
