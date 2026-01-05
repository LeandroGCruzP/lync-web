import { CreateEventForm } from '~/components/create-event-form'
import { Header } from '~/components/header'

export default function CreateEventPage() {
  return (
    <div className="space-y-4 pt-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Create event</h1>

        <CreateEventForm />
      </main>
    </div>
  )
}
