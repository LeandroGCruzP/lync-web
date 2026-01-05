import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { ability } from '~/auth/auth'
import { EventList } from '~/components/event-list'
import { Button } from '~/components/ui/button'

export default async function EventsPage({
  params,
}: {
  params: { slug: string }
}) {
  const permissions = await ability()
  const canCreateEvent = permissions?.can('create', 'Event')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>

        {canCreateEvent && (
          <Button size="sm" asChild>
            <Link href={`/org/${params.slug}/create-event`}>
              <div
                className="mr-2 flex items-center justify-center"
                style={{
                  height: 'calc(var(--spacing) * 5)',
                  width: 'calc(var(--spacing) * 5)',
                }}
              >
                <PlusCircle className="size-4" />
              </div>
              Create event
            </Link>
          </Button>
        )}
      </div>

      <EventList />
    </div>
  )
}
