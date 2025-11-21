import { ability, getCurrentOrgSlug } from '~/auth/auth'
import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  const orgSlug = await getCurrentOrgSlug()
  const permissions = await ability()

  const canUpdateOrg = permissions?.can('update', 'Organization')
  const canGetMembers = permissions?.can('get', 'User')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
        >
          <NavLink href={`/org/${orgSlug}`}>Events</NavLink>
        </Button>
        {canGetMembers && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
          >
            <NavLink href={`/org/${orgSlug}/members`}>Members</NavLink>
          </Button>
        )}
        {canUpdateOrg && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
          >
            <NavLink href={`/org/${orgSlug}/settings`}>Settings</NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
