import { Header } from '~/components/header'

export default function HomePage() {
  return (
    <div className="space-y-4 pt-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Home</h1>
      </main>
    </div>
  )
}
