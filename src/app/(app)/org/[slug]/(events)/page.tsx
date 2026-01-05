import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ability } from '~/auth/auth'
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
              <Plus className="mr-2 size-4" />
              Create event
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
