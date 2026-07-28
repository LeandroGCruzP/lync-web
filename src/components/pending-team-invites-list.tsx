'use client'

import { Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { acceptTeamInviteAction } from '~/actions/accept-team-invite-action'
import { rejectTeamInviteAction } from '~/actions/reject-team-invite-action'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { TeamInvite } from '~/interfaces/team-interfaces'

interface PendingTeamInvitesListProps {
  invites: TeamInvite[]
}

export function PendingTeamInvitesList({
  invites,
}: PendingTeamInvitesListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleAccept(inviteId: string) {
    startTransition(async () => {
      await acceptTeamInviteAction(inviteId)
      router.refresh()
    })
  }

  async function handleReject(inviteId: string) {
    startTransition(async () => {
      await rejectTeamInviteAction(inviteId)
      router.refresh()
    })
  }

  if (invites.length === 0) return null

  return (
    <Card className="border-white/5 bg-white/2 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-black tracking-wider text-white uppercase italic">
          Convites Pendentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {invites.map((invite) => {
          const teamName = invite.team?.name ?? 'Time'
          const authorName = invite.author?.name ?? 'Alguém'
          const initials = teamName.slice(0, 2).toUpperCase()

          return (
            <div
              key={invite.id}
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-white/10">
                  {invite.team?.avatarUrl && (
                    <AvatarImage src={invite.team.avatarUrl} />
                  )}
                  <AvatarFallback className="bg-zinc-800 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-white">{teamName}</h4>
                  <p className="text-muted-foreground text-xs">
                    Convidado por{' '}
                    <span className="font-medium text-white">{authorName}</span>{' '}
                    como{' '}
                    <span className="text-primary font-semibold">
                      {invite.role}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAccept(invite.id)}
                  disabled={isPending}
                  className="h-9 rounded-xl border-white/10 hover:bg-emerald-500/20 hover:text-emerald-400"
                >
                  <Check className="mr-1 size-4" />
                  Aceitar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(invite.id)}
                  disabled={isPending}
                  className="h-9 rounded-xl border-white/10 hover:bg-rose-500/20 hover:text-rose-400"
                >
                  <X className="mr-1 size-4" />
                  Recusar
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
