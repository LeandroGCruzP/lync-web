'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '~/components/ui/button'
import { deleteTeam } from '~/http/delete-team'

interface DeleteTeamButtonProps {
  teamId: string
}

export function DeleteTeamButton({ teamId }: DeleteTeamButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleDelete() {
    if (
      !confirm('Deseja realmente deletar este time? Esta ação é irreversível.')
    )
      return
    startTransition(async () => {
      try {
        await deleteTeam(teamId)
        router.push('/teams')
        router.refresh()
      } catch (err) {
        alert('Erro ao excluir time')
      }
    })
  }

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={handleDelete}
      className="bg-red-650 h-10 rounded-xl px-6 text-xs font-bold tracking-wider uppercase hover:bg-red-700"
    >
      <Trash2 className="mr-2 size-4" />
      Excluir Time
    </Button>
  )
}
