'use client'

import { LogOut, Mail, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { acceptTeamJoinRequestAction } from '~/actions/accept-team-join-request-action'
import { rejectTeamJoinRequestAction } from '~/actions/reject-team-join-request-action'
import { removePlayerAction } from '~/actions/remove-player-action'
import { revokeTeamInviteAction } from '~/actions/revoke-team-invite-action'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import type { Team } from '~/interfaces/team-interfaces'

interface TeamMembersListProps {
  currentUserId: string
  isAdmin: boolean
  team: Team
}

export function TeamMembersList({
  currentUserId,
  isAdmin,
  team,
}: TeamMembersListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleRemovePlayer(playerId: string) {
    if (!confirm('Deseja realmente remover este jogador do time?')) return
    startTransition(async () => {
      const res = await removePlayerAction(team.id, playerId)
      if (res.success) {
        router.refresh()
      } else {
        alert(res.message ?? 'Erro ao remover jogador')
      }
    })
  }

  async function handleLeaveTeam(playerId: string) {
    if (!confirm('Deseja realmente sair deste time?')) return
    startTransition(async () => {
      const res = await removePlayerAction(team.id, playerId)
      if (res.success) {
        router.push('/teams')
        router.refresh()
      } else {
        alert(res.message ?? 'Erro ao sair do time')
      }
    })
  }

  async function handleRevokeInvite(inviteId: string) {
    if (!confirm('Deseja realmente cancelar este convite?')) return
    startTransition(async () => {
      const res = await revokeTeamInviteAction(inviteId)
      if (res.success) {
        router.refresh()
      } else {
        alert(res.message ?? 'Erro ao revogar convite')
      }
    })
  }

  async function handleAcceptJoinRequest(requestId: string) {
    if (!confirm('Deseja realmente aceitar a solicitação deste jogador?'))
      return
    startTransition(async () => {
      const res = await acceptTeamJoinRequestAction(requestId)
      if (res.success) {
        router.refresh()
      } else {
        alert(res.message ?? 'Erro ao aceitar solicitação')
      }
    })
  }

  async function handleRejectJoinRequest(requestId: string) {
    if (!confirm('Deseja realmente recusar a solicitação deste jogador?'))
      return
    startTransition(async () => {
      const res = await rejectTeamJoinRequestAction(requestId)
      if (res.success) {
        router.refresh()
      } else {
        alert(res.message ?? 'Erro ao recusar solicitação')
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Active Members */}
      <div className="space-y-4">
        <h3 className="text-md font-black tracking-wider text-white/90 uppercase italic">
          Jogadores no Time ({team.players.length})
        </h3>
        <div className="space-y-3">
          {team.players.map((player) => {
            const playerName = player.user.name ?? 'Jogador'
            const initials = playerName.slice(0, 2).toUpperCase()
            const isSelf = player.user.id === currentUserId
            const isOwner = player.user.id === team.ownerId

            return (
              <div
                key={player.id}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/2 p-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/10">
                    {player.user.avatarUrl && (
                      <AvatarImage src={player.user.avatarUrl} />
                    )}
                    <AvatarFallback className="bg-zinc-800 text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-white">
                      {playerName}
                      {isSelf && (
                        <span className="bg-primary/20 text-primary border-primary/30 rounded-full border px-2 py-0.5 text-[10px] font-black tracking-widest uppercase">
                          Você
                        </span>
                      )}
                      {isOwner && (
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-2 py-0.5 text-[10px] font-black tracking-widest text-amber-400 uppercase">
                          Dono
                        </span>
                      )}
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      {player.user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-xl px-3 py-1 text-xs font-bold tracking-wider uppercase ${player.role === 'ADMIN' ? 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-400' : 'bg-zinc-850 border border-zinc-700/50 text-zinc-400'}`}
                  >
                    {player.role === 'ADMIN' ? 'Administrador' : 'Jogador'}
                  </span>

                  {isSelf && !isOwner && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => handleLeaveTeam(player.id)}
                      className="h-9 rounded-xl border-rose-500/20 text-rose-400 hover:bg-rose-500/10"
                    >
                      <LogOut className="mr-1 size-4" />
                      Sair
                    </Button>
                  )}

                  {isAdmin && !isSelf && !isOwner && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => handleRemovePlayer(player.id)}
                      className="h-9 rounded-xl border-white/10 hover:bg-rose-500/20 hover:text-rose-400"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pending Invites */}
      {isAdmin && team.invites && team.invites.length > 0 && (
        <div className="space-y-4 border-t border-white/5 pt-4">
          <h3 className="text-md font-black tracking-wider text-white/90 uppercase italic">
            Convites Enviados Pendentes ({team.invites.length})
          </h3>
          <div className="space-y-3">
            {team.invites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/2 p-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{invite.email}</h4>
                    <p className="text-muted-foreground text-xs">
                      Convidado como{' '}
                      <span className="text-primary font-semibold">
                        {invite.role === 'ADMIN' ? 'Administrador' : 'Jogador'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => handleRevokeInvite(invite.id)}
                    className="h-9 rounded-xl border-white/10 hover:bg-rose-500/20 hover:text-rose-400"
                  >
                    Revogar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Join Requests */}
      {isAdmin && team.joinRequests && team.joinRequests.length > 0 && (
        <div className="space-y-4 border-t border-white/5 pt-4">
          <h3 className="text-md font-black tracking-wider text-white/90 uppercase italic">
            Solicitações de Entrada Pendentes ({team.joinRequests.length})
          </h3>
          <div className="space-y-3">
            {team.joinRequests.map((request) => {
              const playerName = request.user.name ?? 'Jogador'
              const initials = playerName.slice(0, 2).toUpperCase()

              return (
                <div
                  key={request.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/2 p-4 backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-white/10">
                      {request.user.avatarUrl && (
                        <AvatarImage src={request.user.avatarUrl} />
                      )}
                      <AvatarFallback className="bg-zinc-800 text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-white">{playerName}</h4>
                      <p className="text-muted-foreground text-xs">
                        {request.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => handleAcceptJoinRequest(request.id)}
                      className="border-primary/20 text-primary hover:bg-primary/20 h-9 rounded-xl"
                    >
                      Aceitar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => handleRejectJoinRequest(request.id)}
                      className="h-9 rounded-xl border-white/10 hover:bg-rose-500/20 hover:text-rose-400"
                    >
                      Recusar
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
