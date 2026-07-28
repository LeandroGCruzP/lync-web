import { Slash } from 'lucide-react'
import Link from 'next/link'
import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  return (
    <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between rounded-2xl border border-white/5 bg-white/2 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Link href="/">
          <span className="font-bold">Lync</span>
        </Link>

        <Slash className="text-border size-3 -rotate-45" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
