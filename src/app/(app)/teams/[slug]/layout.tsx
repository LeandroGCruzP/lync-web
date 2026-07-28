import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Header } from '~/components/header'
import { TeamTabs } from '~/components/team-tabs'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { getProfile } from '~/http/get-profile'
import { getTeam } from '~/http/get-team'

interface TeamLayoutProps {
  children: ReactNode
  params: Promise<{
    slug: string
  }>
}

export default async function TeamLayout({
  children,
  params,
}: TeamLayoutProps) {
  const { slug } = await params
  const { team } = await getTeam(slug)
  const { user: currentUser } = await getProfile()

  const initials = team.name.slice(0, 2).toUpperCase()
  const isOwner = currentUser.id === team.ownerId
  const userMembership = team.players.find((p) => p.userId === currentUser.id)
  const isAdmin = userMembership?.role === 'ADMIN' || isOwner

  return (
    <div className="min-h-screen space-y-4 bg-zinc-950 p-4 text-white">
      <Header />

      <div className="mx-auto w-full max-w-[1200px] space-y-6 pt-4">
        {/* Back Link */}
        <div className="flex items-center px-4">
          <Button
            variant="link"
            size="sm"
            asChild
            className="text-muted-foreground p-0 hover:text-white"
          >
            <Link href="/teams" className="flex items-center gap-1">
              <ArrowLeft className="size-4" />
              Voltar para Times
            </Link>
          </Button>
        </div>

        {/* Team Profile Header */}
        <div className="flex flex-col gap-6 border-b border-white/5 px-4 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 border border-white/10 shadow-2xl">
              {team.avatarUrl && <AvatarImage src={team.avatarUrl} />}
              <AvatarFallback className="bg-zinc-800 text-3xl font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-black tracking-wider text-white uppercase italic">
                {team.name}
              </h1>
              <p className="text-muted-foreground mt-1 max-w-xl text-sm">
                {team.description || 'Este time não possui descrição.'}
              </p>
              <p className="mt-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                Líder: {team.owner.name} • Criado em{' '}
                {new Date(team.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        <TeamTabs slug={slug} isAdmin={isAdmin} />

        <main className="py-4">{children}</main>
      </div>
    </div>
  )
}
