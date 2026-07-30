import { redirect } from 'next/navigation'
import { Header } from '~/components/header'
import { UpdateEventForm } from '~/components/update-event-form'
import { getEvent } from '~/http/get-event'

interface SettingsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventSettingsPage({ params }: SettingsPageProps) {
  const { slug } = await params
  let event
  try {
    const res = await getEvent(slug)
    event = res.event
  } catch {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col space-y-4 bg-zinc-950 p-4 text-white">
      <Header />
      <main className="mx-auto mt-8 w-full max-w-[600px] rounded-2xl border border-white/5 bg-zinc-900 p-6 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 text-2xl font-black tracking-tighter uppercase italic">
          Configurações do <span className="text-primary">Evento</span>
        </h1>
        <UpdateEventForm event={event} />
      </main>
    </div>
  )
}
