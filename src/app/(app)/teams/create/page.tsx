import { CreateTeamForm } from '~/components/create-team-form'
import { Header } from '~/components/header'

export default function CreateTeamPage() {
  return (
    <div className="min-h-screen space-y-4 bg-zinc-950 p-4 text-white">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-6 py-10">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-black tracking-wider text-white uppercase italic">
            Criar Novo <span className="text-primary">Time</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Defina o nome e o lema da sua equipe para começar a convidar
            jogadores
          </p>
        </div>

        <CreateTeamForm />
      </main>
    </div>
  )
}
