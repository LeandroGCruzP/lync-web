'use client'

import { AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { createTeamJoinRequestAction } from '~/actions/create-team-join-request-action'
import { Button } from '~/components/ui/button'

interface GuestTeamBannerProps {
  hasPendingRequest: boolean
  teamId: string
}

export function GuestTeamBanner({
  hasPendingRequest,
  teamId,
}: GuestTeamBannerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleJoinRequest() {
    startTransition(async () => {
      const res = await createTeamJoinRequestAction(teamId)
      if (res.success) {
        router.refresh()
      } else {
        alert(res.message ?? 'Erro ao solicitar entrada no time')
      }
    })
  }

  return (
    <div className="border-primary/20 bg-primary/5 mx-4 overflow-hidden rounded-2xl border p-4 backdrop-blur-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-primary mt-0.5 size-5 shrink-0" />
          <div>
            <h3 className="text-sm font-bold tracking-wider text-white uppercase italic sm:text-base">
              Você não é membro deste time
            </h3>
            <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
              {hasPendingRequest
                ? 'Sua solicitação de entrada foi enviada e está aguardando aprovação dos administradores.'
                : 'Para participar das atividades e competir pelo time, solicite a entrada na equipe.'}
            </p>
          </div>
        </div>

        <div>
          {hasPendingRequest ? (
            <Button
              disabled
              size="sm"
              className="w-full cursor-not-allowed rounded-xl border border-zinc-700/50 bg-zinc-800 px-6 text-xs font-semibold text-zinc-400 sm:w-auto"
            >
              Solicitação Pendente
            </Button>
          ) : (
            <Button
              disabled={isPending}
              onClick={handleJoinRequest}
              size="sm"
              className="bg-primary hover:bg-primary/95 shadow-primary/20 w-full rounded-xl px-6 py-2 text-xs font-bold text-black shadow-lg transition-all sm:w-auto"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Solicitando...
                </>
              ) : (
                'Solicitar Entrar'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
