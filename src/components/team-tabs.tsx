import { NavLink } from './nav-link'
import { Button } from './ui/button'

interface TeamTabsProps {
  isAdmin: boolean
  slug: string
}

export function TeamTabs({ isAdmin, slug }: TeamTabsProps) {
  return (
    <div className="border-b border-white/5 py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2 px-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-white/10"
        >
          <NavLink href={`/teams/${slug}`}>Eventos</NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-white/10"
        >
          <NavLink href={`/teams/${slug}/members`}>Membros</NavLink>
        </Button>
        {isAdmin && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground border border-transparent data-[current=true]:border-white/10"
          >
            <NavLink href={`/teams/${slug}/settings`}>Configurações</NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
