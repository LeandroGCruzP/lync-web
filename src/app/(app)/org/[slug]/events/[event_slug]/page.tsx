import { isAuthenticated } from '~/auth/auth'
import { EventDetails } from '~/components/event-details'
import { getEvent } from '~/http/get-event'
import { getProfile } from '~/http/get-profile'
import { getUserTeams } from '~/http/get-user-teams'

interface EventPageProps {
  params: Promise<{
    event_slug: string
    slug: string
  }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { event_slug } = await params
  const { event, isRegistered } = await getEvent(event_slug)

  const isLogged = await isAuthenticated()
  let teams: any[] = []
  let user: any = null

  if (isLogged) {
    try {
      const profileRes = await getProfile()
      user = profileRes.user
      const teamsRes = await getUserTeams()
      teams = teamsRes.teams
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <EventDetails
      event={event}
      isRegistered={isRegistered}
      teams={teams}
      user={user}
    />
  )
}
