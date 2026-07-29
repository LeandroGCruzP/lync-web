'use client'

import { Loader2, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { createTeamJoinRequestAction } from '~/actions/create-team-join-request-action'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import type { Team } from '~/interfaces/team-interfaces'

interface UserTeamsListProps {
  currentUserId?: string
  teams: Team[]
}

export function UserTeamsList({ currentUserId, teams }: UserTeamsListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleJoinRequest(teamId: string) {
    startTransition(async () => {
      const res = await createTeamJoinRequestAction(teamId)
      if (res.success) {
        router.refresh()
      } else {
        alert(res.message ?? 'Erro ao solicitar entrada no time')
      }
    })
  }

  if (teams.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/5 bg-white/2 p-6 text-center backdrop-blur-md">
        <Users className="text-muted-foreground mb-2 size-8" />
        <p className="text-muted-foreground text-sm font-medium">
          Nenhum time encontrado.
        </p>
        <p className="text-muted-foreground/60 mt-1 text-xs">
          Crie um novo time ou peça para ser convidado!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => {
        const initials = team.name.slice(0, 2).toUpperCase()
        const membersCount = team._count?.players ?? team.players?.length ?? 1
        const isOwner = team.ownerId === currentUserId
        const isMember = isOwner || team.players.length > 0
        const hasRequested = team.joinRequests && team.joinRequests.length > 0

        return (
          <Link
            href={`/teams/${team.slug}`}
            key={team.id}
            className="block transition-transform hover:-translate-y-1"
          >
            <Card
              className={`flex h-full flex-col justify-between border bg-white/2 backdrop-blur-md transition-all ${
                isMember
                  ? 'border-primary/20 hover:border-primary/40 shadow-[0_0_15px_rgba(234,179,8,0.03)]'
                  : hasRequested
                    ? 'hover:border-zinc-650 border-zinc-700/50'
                    : 'border-white/5 hover:border-white/15'
              }`}
            >
              <CardHeader className="flex flex-row items-start gap-4 pb-3">
                <Avatar className="mt-1 h-12 w-12 border border-white/10">
                  {team.avatarUrl && <AvatarImage src={team.avatarUrl} />}
                  <AvatarFallback className="bg-zinc-800 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="truncate text-lg font-bold text-white uppercase italic">
                      {team.name}
                    </CardTitle>
                    {isOwner ? (
                      <Badge className="shrink-0 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[9px] font-black tracking-wider text-amber-400 uppercase hover:bg-amber-500/20">
                        Dono
                      </Badge>
                    ) : isMember ? (
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-black tracking-wider uppercase">
                        Membro
                      </Badge>
                    ) : hasRequested ? (
                      <Badge className="shrink-0 rounded-full border border-zinc-600/30 bg-zinc-700/20 px-2 py-0.5 text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                        Pendente
                      </Badge>
                    ) : (
                      <Badge className="shrink-0 rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                        Org
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-1 flex flex-wrap items-center gap-1 truncate text-xs">
                    <span>Criado por {team.owner.name}</span>
                    {team.organization && (
                      <>
                        <span>•</span>
                        <span className="text-primary/80 font-medium">
                          {team.organization.name}
                        </span>
                      </>
                    )}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between space-y-3">
                {team.description && (
                  <p className="text-muted-foreground/80 line-clamp-2 min-h-[2.5rem] text-sm">
                    {team.description}
                  </p>
                )}
                <div className="mt-auto space-y-3 border-t border-white/5 pt-3">
                  <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Users className="text-primary size-3.5" />
                      <span>
                        {membersCount}{' '}
                        {membersCount === 1 ? 'membro' : 'membros'}
                      </span>
                    </div>
                  </div>

                  {!isMember && (
                    <div className="w-full pt-1">
                      {hasRequested ? (
                        <Button
                          size="sm"
                          disabled
                          className="w-full cursor-not-allowed rounded-xl border border-zinc-700/30 bg-zinc-800/40 text-xs font-semibold text-zinc-500"
                        >
                          Solicitação Enviada
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled={isPending}
                          onClick={(e) => {
                            e.preventDefault()
                            handleJoinRequest(team.id)
                          }}
                          className="bg-primary/10 border-primary/25 text-primary hover:bg-primary w-full rounded-xl border text-xs font-bold transition-all hover:text-white"
                        >
                          {isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            'Solicitar Entrar'
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
