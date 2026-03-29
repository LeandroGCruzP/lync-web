interface EventPageProps {
  params: {
    event_slug: string
    slug: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { event_slug, slug } = params

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Event {event_slug} for Organization {slug}
      </h1>
    </div>
  )
}
