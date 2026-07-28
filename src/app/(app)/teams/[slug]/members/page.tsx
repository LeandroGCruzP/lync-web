import { InviteTeamMemberForm } from '~/components/invite-team-member-form'
import { TeamMembersList } from '~/components/team-members-list'
import { getProfile } from '~/http/get-profile'
import { getTeam } from '~/http/get-team'

interface TeamMembersPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TeamMembersPage({
  params,
}: TeamMembersPageProps) {
  const { slug } = await params
  const { team } = await getTeam(slug)
  const { user: currentUser } = await getProfile()

  const isOwner = currentUser.id === team.ownerId
  const userMembership = team.players.find((p) => p.userId === currentUser.id)
  const isAdmin = userMembership?.role === 'ADMIN' || isOwner

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-4">
      {isAdmin && <InviteTeamMemberForm teamId={team.id} />}

      <TeamMembersList
        currentUserId={currentUser.id}
        isAdmin={isAdmin}
        team={team}
      />
    </div>
  )
}
