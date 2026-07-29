import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { ability } from '~/auth/auth'
import { Button } from '~/components/ui/button'
import { UserTeamsList } from '~/components/user-teams-list'
import { getProfile } from '~/http/get-profile'
import { getUserTeams } from '~/http/get-user-teams'

interface TeamsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function OrgTeamsPage({ params }: TeamsPageProps) {
  const { slug } = await params
  const permissions = await ability()
  const canCreateTeam = permissions?.can('create', 'Team')

  const [{ teams }, { user: currentUser }] = await Promise.all([
    getUserTeams({ organizationSlug: slug }),
    getProfile(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-white uppercase italic">
            Times da <span className="text-primary">Organização</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Gerencie e visualize as equipes desta organização
          </p>
        </div>

        {canCreateTeam && (
          <Button size="sm" asChild className="rounded-xl">
            <Link href={`/org/${slug}/teams/create`}>
              <PlusCircle className="mr-2 size-4" />
              Criar Time
            </Link>
          </Button>
        )}
      </div>

      <UserTeamsList teams={teams} currentUserId={currentUser.id} />
    </div>
  )
}
