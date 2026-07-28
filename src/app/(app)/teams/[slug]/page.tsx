import { EventList } from '~/components/event-list'

interface TeamEventsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TeamEventsPage({ params }: TeamEventsPageProps) {
  const { slug } = await params

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Eventos Participados</h1>
      </div>

      <EventList teamSlug={slug} />
    </div>
  )
}
