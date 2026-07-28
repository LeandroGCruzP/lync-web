'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { inviteTeamMemberAction } from '~/actions/invite-team-member-action'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import type { FormState } from '~/interfaces/form-state-interfaces'

interface InviteTeamMemberFormProps {
  teamId: string
}

export function InviteTeamMemberForm({ teamId }: InviteTeamMemberFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<FormState>({
    errors: null,
    message: null,
    success: false,
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await inviteTeamMemberAction(teamId, data)
      setFormState(state)
      if (state.success) {
        form.reset()
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-4 rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-md">
      <h3 className="text-md font-black tracking-wider text-white uppercase italic">
        Convidar Jogador
      </h3>

      {formState.success === false && formState.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao enviar convite</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      {formState.success === true && formState.message && (
        <Alert
          variant="default"
          className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
        >
          <AlertTitle>Sucesso</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:flex-row sm:items-end"
      >
        <div className="flex-1 space-y-1">
          <Label
            htmlFor="email"
            className="text-muted-foreground text-xs font-bold tracking-wider uppercase"
          >
            E-mail do Jogador
          </Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="jogador@email.com"
            className="h-10 rounded-xl border-white/10 bg-white/5 text-white placeholder-zinc-500"
            required
          />
          {formState.errors?.email && (
            <p className="text-xs font-semibold text-rose-400">
              {formState.errors.email[0]}
            </p>
          )}
        </div>

        <div className="w-full space-y-1 sm:w-32">
          <Label
            htmlFor="role"
            className="text-muted-foreground text-xs font-bold tracking-wider uppercase"
          >
            Função
          </Label>
          <select
            name="role"
            id="role"
            defaultValue="PLAYER"
            className="focus:border-primary focus:ring-primary h-10 w-full rounded-xl border border-white/10 bg-zinc-900 px-3 text-sm text-white outline-none"
          >
            <option value="PLAYER">Jogador</option>
            <option value="ADMIN">Admin</option>
          </select>
          {formState.errors?.role && (
            <p className="text-xs font-semibold text-rose-400">
              {formState.errors.role[0]}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="h-10 rounded-xl px-6 text-xs font-bold tracking-widest uppercase"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Enviar'}
        </Button>
      </form>
    </div>
  )
}
