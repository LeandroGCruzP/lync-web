import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Header } from '~/components/header'
import { PendingTeamInvitesList } from '~/components/pending-team-invites-list'
import { Button } from '~/components/ui/button'
import { UserTeamsList } from '~/components/user-teams-list'
import { getPendingTeamInvites } from '~/http/get-pending-team-invites'
import { getUserTeams } from '~/http/get-user-teams'

export default async function TeamsPage() {
  // Fetch teams and invites in parallel
  const [{ teams }, { invites }] = await Promise.all([
    getUserTeams(),
    getPendingTeamInvites(),
  ])

  return (
    <div className="min-h-screen space-y-4 bg-zinc-950 p-4 text-white">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-wider text-white uppercase italic">
              Meus <span className="text-primary">Times</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Crie ou gerencie equipes para participar de competições
            </p>
          </div>

          <Button size="sm" asChild className="rounded-xl">
            <Link href="/teams/create">
              <PlusCircle className="mr-2 size-4" />
              Criar Time
            </Link>
          </Button>
        </div>

        <PendingTeamInvitesList invites={invites} />

        <div className="space-y-4">
          <h2 className="text-lg font-black tracking-wider text-white/90 uppercase italic">
            Equipes Ativas
          </h2>
          <UserTeamsList teams={teams} />
        </div>
      </main>
    </div>
  )
}
