'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { createTeamAction } from '~/actions/create-team-action'
import { updateTeamAction } from '~/actions/update-team-action'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import type { FormState } from '~/interfaces/form-state-interfaces'

interface CreateTeamFormProps {
  initialData?: {
    description?: string | null
    name: string
  }
  isUpdating?: boolean
  organizationId?: string | null
  organizationSlug?: string
  teamId?: string
}

export function CreateTeamForm({
  initialData,
  isUpdating = false,
  organizationId,
  organizationSlug,
  teamId,
}: CreateTeamFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<FormState>({
    errors: null,
    message: null,
    success: false,
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    startTransition(async () => {
      const state =
        isUpdating && teamId
          ? await updateTeamAction(teamId, data)
          : await createTeamAction(data)

      setFormState(state)

      if (state.success && !isUpdating) {
        router.push(
          organizationSlug ? `/org/${organizationSlug}/teams` : '/teams',
        )
        router.refresh()
      } else if (state.success && isUpdating) {
        router.refresh()
      }
    })
  }

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-3xl border border-white/5 bg-white/2 p-8 shadow-2xl backdrop-blur-2xl">
      {formState.success === false && formState.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao salvar time</AlertTitle>
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
          <AlertTriangle className="size-4 text-emerald-400" />
          <AlertTitle>Sucesso</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {organizationId && (
          <input type="hidden" name="organizationId" value={organizationId} />
        )}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-bold tracking-wider text-white uppercase"
          >
            Nome do Time
          </Label>
          <Input
            name="name"
            type="text"
            id="name"
            placeholder="Ex: Barcelona FC, Os Incríveis"
            defaultValue={initialData?.name}
            className="focus:border-primary focus:ring-primary rounded-xl border-white/10 bg-white/5 text-white placeholder-zinc-500"
            required
          />
          {formState.errors?.name && (
            <p className="text-xs font-semibold text-rose-400">
              {formState.errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-bold tracking-wider text-white uppercase"
          >
            Descrição / Lema
          </Label>
          <Input
            name="description"
            type="text"
            id="description"
            placeholder="Ex: Time de futebol de amigos do final de semana"
            defaultValue={initialData?.description ?? ''}
            className="focus:border-primary focus:ring-primary rounded-xl border-white/10 bg-white/5 text-white placeholder-zinc-500"
          />
          {formState.errors?.description && (
            <p className="text-xs font-semibold text-rose-400">
              {formState.errors.description[0]}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="text-md h-12 w-full rounded-xl font-bold tracking-widest uppercase"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : isUpdating ? (
            'Salvar Alterações'
          ) : (
            'Criar Time'
          )}
        </Button>
      </form>
    </div>
  )
}
