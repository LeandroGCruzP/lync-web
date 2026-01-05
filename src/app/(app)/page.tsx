import { Plus } from 'lucide-react'
import Link from 'next/link'
import { EventList } from '~/components/event-list'
import { Header } from '~/components/header'
import { Button } from '~/components/ui/button'

export default async function HomePage() {
  return (
    <div className="space-y-4 pt-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Personal Events</h1>

          <Button size="sm" asChild>
            <Link href="/create-event">
              <Plus className="mr-2 size-4" />
              Create event
            </Link>
          </Button>
        </div>

        <EventList />
      </main>
    </div>
  )
}
