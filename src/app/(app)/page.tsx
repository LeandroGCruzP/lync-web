import { Header } from "~/components/header";

export default function HomePage() {
  return (
    <div className='pt-4 space-y-4'>
      <Header />

      <main className=' w-full mx-auto max-w-[1200px] space-y-4'>
        <h1 className="text-2xl font-bold">Home</h1>
      </main>
    </div>
  )
}
