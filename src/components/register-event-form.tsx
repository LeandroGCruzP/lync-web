'use client'

import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  PlusCircle,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { registerForEventAction } from '~/actions/register-for-event-action'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import type { Event } from '~/interfaces/event-interfaces'
import type { Team } from '~/interfaces/team-interfaces'
import type { User } from '~/interfaces/user-interfaces'

interface RegisterEventFormProps {
  event: Event
  isRegistered: boolean
  teams: Team[]
  user: User | null
}

export function RegisterEventForm({
  event,
  isRegistered,
  teams,
  user,
}: RegisterEventFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedTeamId, setSelectedTeamId] = useState<string>('')
  const [formState, setFormState] = useState<{
    message: string | null
    success: boolean | null
  }>({
    message: null,
    success: null,
  })

  // Filter teams where the user is ADMIN or Owner
  const manageableTeams = teams.filter(
    (t) => t.ownerId === user?.id || t.players?.some((p) => p.role === 'ADMIN'),
  )

  const isTeamEvent = event.playersPerTeam !== null && event.playersPerTeam > 1

  // Handle registration submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user) return

    startTransition(async () => {
      const res = await registerForEventAction(
        event.slug,
        isTeamEvent ? selectedTeamId : undefined,
      )

      setFormState({
        message:
          res.message ||
          (res.success
            ? 'Inscrição realizada com sucesso!'
            : 'Erro ao realizar inscrição'),
        success: res.success,
      })

      if (res.success) {
        router.refresh()
      }
    })
  }

  const eventUrl = event.organization
    ? `/org/${event.organization.slug}/events/${event.slug}`
    : `/events/${event.slug}`

  // Case 1: User is not authenticated
  if (!user) {
    return (
      <div className="space-y-4 py-4 text-center">
        <Alert
          variant="destructive"
          className="flex items-center border-white/5 bg-white/2 backdrop-blur-md"
        >
          <AlertTriangle className="text-primary size-4" />
          <div>
            <AlertTitle className="font-bold text-white">
              Autenticação necessária
            </AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Você precisa estar conectado à sua conta para se inscrever neste
              evento.
            </AlertDescription>
          </div>
        </Alert>

        <div className="flex flex-col gap-3 pt-2">
          <Button
            asChild
            className="h-12 rounded-xl text-sm font-bold tracking-wider uppercase"
          >
            <Link href={`/auth/sign-in?redirect=${eventUrl}`}>
              Entrar na Conta
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-xl border-white/10 text-sm font-bold tracking-wider uppercase hover:bg-white/5"
          >
            <Link href={`/auth/sign-up?redirect=${eventUrl}`}>
              Criar Nova Conta
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Case 2: Registration already finished with success or user already registered
  if (isRegistered || formState.success === true) {
    return (
      <div className="space-y-4 py-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="size-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white uppercase italic">
            Inscrição Confirmada!
          </h3>
          <p className="text-muted-foreground text-sm">
            {formState.message || 'Você já está inscrito neste evento.'}
          </p>
        </div>
      </div>
    )
  }

  // Case 3: Team-based event and user does not manage any teams
  if (isTeamEvent && manageableTeams.length === 0) {
    return (
      <div className="space-y-6 py-4 text-center">
        <Alert
          variant="destructive"
          className="border-white/5 bg-white/2 backdrop-blur-md"
        >
          <Users className="text-primary size-4" />
          <AlertTitle className="font-bold text-white">
            Time necessário
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Este é um evento por equipes de {event.playersPerTeam} jogadores.
            Para se inscrever, você precisa gerenciar um time.
          </AlertDescription>
        </Alert>

        <Button
          asChild
          className="h-12 w-full rounded-xl text-sm font-bold tracking-wider uppercase"
        >
          <Link href="/teams/create">
            <PlusCircle className="mr-2 size-4" />
            Criar um Time
          </Link>
        </Button>
      </div>
    )
  }

  // Case 4: Ready to register
  return (
    <div className="space-y-4">
      {formState.success === false && formState.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao realizar inscrição</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isTeamEvent ? (
          <div className="space-y-2">
            <label
              htmlFor="team-select"
              className="text-muted-foreground text-xs font-bold tracking-wider uppercase"
            >
              Selecione o Time Participante
            </label>
            <select
              id="team-select"
              required
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="focus:border-primary focus:ring-primary h-12 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm text-white outline-none"
            >
              <option value="" disabled>
                Escolha um time...
              </option>
              {manageableTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <p className="text-muted-foreground/60 text-[10px]">
              Apenas times que você administra aparecem nesta lista.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-white/2 p-4 backdrop-blur-md">
            <p className="text-muted-foreground text-sm">
              Você está se inscrevendo como{' '}
              <span className="font-bold text-white">{user.name}</span> (
              {user.email}).
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="text-md h-12 w-full rounded-xl font-bold tracking-widest uppercase"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : isTeamEvent ? (
            'Inscrever Time'
          ) : (
            'Confirmar Inscrição'
          )}
        </Button>
      </form>
    </div>
  )
}
