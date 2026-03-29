import { Header } from '~/components/header'

interface EventPageProps {
  params: {
    slug: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params

  return (
    <div className="space-y-4 p-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Event {slug} (Standalone)</h1>
      </main>
    </div>
  )
}
