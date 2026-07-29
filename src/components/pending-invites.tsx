'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Bell, Check, X } from 'lucide-react'
import { useState } from 'react'
import { acceptEventInviteAction } from '~/actions/accept-event-invite-action'
import { acceptInviteAction } from '~/actions/accept-invite-action'
import { acceptTeamInviteAction } from '~/actions/accept-team-invite-action'
import { acceptTeamJoinRequestAction } from '~/actions/accept-team-join-request-action'
import { rejectEventInviteAction } from '~/actions/reject-event-invite-action'
import { rejectInviteAction } from '~/actions/reject-invite-action'
import { rejectTeamInviteAction } from '~/actions/reject-team-invite-action'
import { rejectTeamJoinRequestAction } from '~/actions/reject-team-join-request-action'
import { getPendingEventInvites } from '~/http/get-pending-event-invites'
import { getPendingTeamInvites } from '~/http/get-pending-team-invites'
import { getPendingTeamJoinRequests } from '~/http/get-pending-team-join-requests'
import { getUserAuthPendingInvites } from '~/http/get-user-auth-pending-invites'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

dayjs.extend(relativeTime)

export function PendingInvites() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const { data: orgInvitesData } = useQuery({
    queryFn: getUserAuthPendingInvites,
    queryKey: ['pending-invites'],
  })

  const { data: teamInvitesData } = useQuery({
    queryFn: getPendingTeamInvites,
    queryKey: ['pending-team-invites'],
  })

  const { data: eventInvitesData } = useQuery({
    queryFn: getPendingEventInvites,
    queryKey: ['pending-event-invites'],
  })

  const { data: teamJoinRequestsData } = useQuery({
    queryFn: getPendingTeamJoinRequests,
    queryKey: ['pending-team-join-requests'],
  })

  const orgInvites = orgInvitesData?.invites ?? []
  const teamInvites = teamInvitesData?.invites ?? []
  const eventInvites = eventInvitesData?.invites ?? []
  const teamJoinRequests = teamJoinRequestsData?.requests ?? []

  const totalCount =
    orgInvites.length +
    teamInvites.length +
    eventInvites.length +
    teamJoinRequests.length

  async function handleAcceptOrgInvite(inviteId: string) {
    await acceptInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRejectOrgInvite(inviteId: string) {
    await rejectInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleAcceptTeamInvite(inviteId: string) {
    await acceptTeamInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-team-invites'] })
  }

  async function handleRejectTeamInvite(inviteId: string) {
    await rejectTeamInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-team-invites'] })
  }

  async function handleAcceptEventInvite(inviteId: string) {
    await acceptEventInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-event-invites'] })
  }

  async function handleRejectEventInvite(inviteId: string) {
    await rejectEventInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-event-invites'] })
  }

  async function handleAcceptTeamJoinRequest(requestId: string) {
    await acceptTeamJoinRequestAction(requestId)
    queryClient.invalidateQueries({ queryKey: ['pending-team-join-requests'] })
  }

  async function handleRejectTeamJoinRequest(requestId: string) {
    await rejectTeamJoinRequestAction(requestId)
    queryClient.invalidateQueries({ queryKey: ['pending-team-join-requests'] })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size={'icon'} variant={'ghost'} className="relative">
          <Bell className="size-4 text-white" />
          <span className="sr-only">Notificações</span>

          {totalCount > 0 && (
            <span className="bg-destructive absolute -top-0.5 -right-0.5 flex size-3 items-center justify-center rounded-full text-[8px] font-bold text-white">
              {totalCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-h-[400px] w-80 space-y-4 overflow-y-auto border-white/10 bg-zinc-950/95 backdrop-blur-md">
        <span className="block border-b border-white/5 pb-2 text-sm font-semibold text-white">
          Notificações ({totalCount})
        </span>

        {totalCount === 0 && (
          <p className="text-muted-foreground py-2 text-sm">
            Nenhuma notificação pendente.
          </p>
        )}

        {/* Organizations Section */}
        {orgInvites.length > 0 && (
          <div className="space-y-3">
            <span className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
              Organizações
            </span>
            {orgInvites.map((invite) => (
              <div
                key={invite.id}
                className="space-y-2 rounded-xl border border-white/5 bg-white/2 p-3"
              >
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <span className="text-foreground font-semibold text-white">
                    {invite.author?.name ?? 'Alguém'}
                  </span>{' '}
                  convidou você para{' '}
                  <span className="text-foreground font-semibold text-white">
                    {invite.organization.name}
                  </span>{' '}
                  <span className="text-muted-foreground/60 mt-0.5 block text-[10px]">
                    {dayjs(invite.createdAt).fromNow()}
                  </span>
                </p>
                <div className="flex justify-end gap-1">
                  <Button
                    size={'xs'}
                    variant={'ghost'}
                    className="text-muted-foreground hover:bg-rose-500/10 hover:text-rose-400"
                    onClick={() => handleRejectOrgInvite(invite.id)}
                  >
                    <X className="mr-1 size-3" />
                    Recusar
                  </Button>
                  <Button
                    size={'xs'}
                    variant={'outline'}
                    className="border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400"
                    onClick={() => handleAcceptOrgInvite(invite.id)}
                  >
                    <Check className="mr-1 size-3" />
                    Aceitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Teams Section */}
        {teamInvites.length > 0 && (
          <div className="space-y-3">
            <span className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
              Times
            </span>
            {teamInvites.map((invite) => (
              <div
                key={invite.id}
                className="space-y-2 rounded-xl border border-white/5 bg-white/2 p-3"
              >
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <span className="text-foreground font-semibold text-white">
                    {invite.author?.name ?? 'Alguém'}
                  </span>{' '}
                  convidou você para o time{' '}
                  <span className="text-foreground font-semibold text-white">
                    {invite.team?.name ?? 'Time'}
                  </span>{' '}
                  como{' '}
                  <span className="text-primary font-semibold">
                    {invite.role}
                  </span>
                  <span className="text-muted-foreground/60 mt-0.5 block text-[10px]">
                    {dayjs(invite.createdAt).fromNow()}
                  </span>
                </p>
                <div className="flex justify-end gap-1">
                  <Button
                    size={'xs'}
                    variant={'ghost'}
                    className="text-muted-foreground hover:bg-rose-500/10 hover:text-rose-400"
                    onClick={() => handleRejectTeamInvite(invite.id)}
                  >
                    <X className="mr-1 size-3" />
                    Recusar
                  </Button>
                  <Button
                    size={'xs'}
                    variant={'outline'}
                    className="border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400"
                    onClick={() => handleAcceptTeamInvite(invite.id)}
                  >
                    <Check className="mr-1 size-3" />
                    Aceitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events Section */}
        {eventInvites.length > 0 && (
          <div className="space-y-3">
            <span className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
              Eventos
            </span>
            {eventInvites.map((invite) => (
              <div
                key={invite.id}
                className="space-y-2 rounded-xl border border-white/5 bg-white/2 p-3"
              >
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <span className="text-foreground font-semibold text-white">
                    {invite.author?.name ?? 'Alguém'}
                  </span>{' '}
                  convidou você para o evento{' '}
                  <span className="text-foreground font-semibold text-white">
                    {invite.event.name}
                  </span>{' '}
                  como{' '}
                  <span className="text-primary font-semibold">
                    {invite.role}
                  </span>
                  <span className="text-muted-foreground/60 mt-0.5 block text-[10px]">
                    {dayjs(invite.createdAt).fromNow()}
                  </span>
                </p>
                <div className="flex justify-end gap-1">
                  <Button
                    size={'xs'}
                    variant={'ghost'}
                    className="text-muted-foreground hover:bg-rose-500/10 hover:text-rose-400"
                    onClick={() => handleRejectEventInvite(invite.id)}
                  >
                    <X className="mr-1 size-3" />
                    Recusar
                  </Button>
                  <Button
                    size={'xs'}
                    variant={'outline'}
                    className="border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400"
                    onClick={() => handleAcceptEventInvite(invite.id)}
                  >
                    <Check className="mr-1 size-3" />
                    Aceitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Join Requests Section */}
        {teamJoinRequests.length > 0 && (
          <div className="space-y-3">
            <span className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
              Solicitações de Entrada (Times)
            </span>
            {teamJoinRequests.map((req) => (
              <div
                key={req.id}
                className="space-y-2 rounded-xl border border-white/5 bg-white/2 p-3"
              >
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <span className="text-foreground font-semibold text-white">
                    {req.user.name ?? 'Alguém'}
                  </span>{' '}
                  solicitou entrar no time{' '}
                  <span className="text-foreground font-semibold text-white">
                    {req.team.name}
                  </span>{' '}
                  <span className="text-muted-foreground/60 mt-0.5 block text-[10px]">
                    {dayjs(req.createdAt).fromNow()}
                  </span>
                </p>
                <div className="flex justify-end gap-1">
                  <Button
                    size={'xs'}
                    variant={'ghost'}
                    className="text-muted-foreground hover:bg-rose-500/10 hover:text-rose-400"
                    onClick={() => handleRejectTeamJoinRequest(req.id)}
                  >
                    <X className="mr-1 size-3" />
                    Recusar
                  </Button>
                  <Button
                    size={'xs'}
                    variant={'outline'}
                    className="border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400"
                    onClick={() => handleAcceptTeamJoinRequest(req.id)}
                  >
                    <Check className="mr-1 size-3" />
                    Aceitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
