import Link from 'next/link'
import { ReactNode } from 'react'
import { GuestTeamBanner } from '~/components/guest-team-banner'
import { Header } from '~/components/header'
import { TeamBreadcrumbs } from '~/components/team-breadcrumbs'
import { TeamTabs } from '~/components/team-tabs'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
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
  const isMember = isOwner || !!userMembership

  return (
    <div className="min-h-screen space-y-4 bg-zinc-950 p-4 text-white">
      <Header />

      <div className="mx-auto w-full max-w-[1200px] space-y-6 pt-4">
        {/* Breadcrumbs */}
        <TeamBreadcrumbs
          teamName={team.name}
          teamSlug={slug}
          organizationSlug={team.organization?.slug}
        />

        {!isMember && (
          <GuestTeamBanner
            teamId={team.id}
            hasPendingRequest={!!team.userJoinRequest}
          />
        )}

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
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                <span>Líder: {team.owner.name}</span>
                <span>•</span>
                <span>
                  Criado em{' '}
                  {new Date(team.createdAt).toLocaleDateString('pt-BR')}
                </span>
                {team.organization && (
                  <>
                    <span>•</span>
                    <span className="text-zinc-500">Organização:</span>
                    <Link
                      href={`/org/${team.organization.slug}`}
                      className="text-primary flex items-center gap-1 font-black tracking-normal normal-case hover:underline"
                    >
                      {team.organization.name}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <TeamTabs slug={slug} isAdmin={isAdmin} />

        <main className="py-4">{children}</main>
      </div>
    </div>
  )
}
