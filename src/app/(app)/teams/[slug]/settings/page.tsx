import { Shield } from 'lucide-react'
import { CreateTeamForm } from '~/components/create-team-form'
import { DeleteTeamButton } from '~/components/delete-team-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { getProfile } from '~/http/get-profile'
import { getTeam } from '~/http/get-team'

interface TeamSettingsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TeamSettingsPage({
  params,
}: TeamSettingsPageProps) {
  const { slug } = await params
  const { team } = await getTeam(slug)
  const { user: currentUser } = await getProfile()

  const isOwner = currentUser.id === team.ownerId
  const userMembership = team.players.find((p) => p.userId === currentUser.id)
  const isAdmin = userMembership?.role === 'ADMIN' || isOwner

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-4">
      <div>
        <h1 className="text-2xl font-black tracking-wider text-white uppercase italic">
          Configurações do <span className="text-primary">Time</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Gerencie as informações públicas e opções administrativas do time.
        </p>
      </div>

      <div className="space-y-6">
        {isAdmin && (
          <Card className="border-white/5 bg-white/2 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-bold text-white">
                Dados do Time
              </CardTitle>
              <CardDescription>
                Atualize o nome e descrição da equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateTeamForm
                isUpdating
                teamId={team.id}
                initialData={{
                  description: team.description,
                  name: team.name,
                }}
              />
            </CardContent>
          </Card>
        )}

        {isOwner && (
          <Card className="border-rose-500/10 bg-rose-500/2 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bold text-rose-400">
                <Shield className="size-4" />
                Zona de Perigo
              </CardTitle>
              <CardDescription className="text-rose-500/60">
                Esta ação excluirá permanentemente o time, todos os jogadores e
                as inscrições dele em eventos. Esta ação não pode ser desfeita.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeleteTeamButton teamId={team.id} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
