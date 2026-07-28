import { Users } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import type { Team } from '~/interfaces/team-interfaces'

interface UserTeamsListProps {
  teams: Team[]
}

export function UserTeamsList({ teams }: UserTeamsListProps) {
  if (teams.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/5 bg-white/2 p-6 text-center backdrop-blur-md">
        <Users className="text-muted-foreground mb-2 size-8" />
        <p className="text-muted-foreground text-sm font-medium">
          Você não faz parte de nenhum time ainda.
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

        return (
          <Link
            href={`/teams/${team.slug}`}
            key={team.id}
            className="block transition-transform hover:-translate-y-1"
          >
            <Card className="hover:border-primary/30 h-full border border-white/5 bg-white/2 backdrop-blur-md transition-all">
              <CardHeader className="flex flex-row items-center gap-4 pb-3">
                <Avatar className="h-12 w-12 border border-white/10">
                  {team.avatarUrl && <AvatarImage src={team.avatarUrl} />}
                  <AvatarFallback className="bg-zinc-800 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate text-lg font-bold text-white uppercase italic">
                    {team.name}
                  </CardTitle>
                  <CardDescription className="truncate text-xs">
                    Criado por {team.owner.name}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {team.description && (
                  <p className="text-muted-foreground/80 line-clamp-2 min-h-[2.5rem] text-sm">
                    {team.description}
                  </p>
                )}
                <div className="text-muted-foreground flex items-center gap-3 border-t border-white/5 pt-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Users className="text-primary size-3.5" />
                    <span>
                      {membersCount} {membersCount === 1 ? 'membro' : 'membros'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
