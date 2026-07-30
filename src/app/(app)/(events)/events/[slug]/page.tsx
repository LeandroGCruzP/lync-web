import { HTTPError } from 'ky'
import { isAuthenticated } from '~/auth/auth'
import { EventDetails } from '~/components/event-details'
import { EventNotFound } from '~/components/event-not-found'
import { getEvent } from '~/http/get-event'
import { getProfile } from '~/http/get-profile'
import { getUserTeams } from '~/http/get-user-teams'

interface EventPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params

  try {
    const { event, isRegistered } = await getEvent(slug)

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
  } catch (err) {
    if (
      err instanceof HTTPError &&
      (err.response.status === 401 ||
        err.response.status === 404 ||
        err.response.status === 400)
    ) {
      return <EventNotFound />
    }
    throw err
  }
}
