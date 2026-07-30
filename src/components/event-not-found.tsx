import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Header } from '~/components/header'
import { Button } from '~/components/ui/button'

export function EventNotFound() {
  return (
    <div className="flex min-h-screen flex-col space-y-4 bg-zinc-950 p-4 text-white">
      <Header />
      <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center space-y-6 text-center">
        <div className="flex items-center justify-center rounded-full border border-white/5 bg-zinc-900 p-6 shadow-xl backdrop-blur-md">
          <AlertCircle className="text-primary size-16 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight uppercase italic">
            Evento não <span className="text-primary">encontrado</span>
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Não encontramos nenhum evento público registrado com esta URL.
            Verifique se o endereço está correto ou se você possui o convite
            necessário.
          </p>
        </div>
        <Button
          asChild
          className="bg-primary text-primary-foreground h-12 w-full rounded-xl font-bold"
        >
          <Link href="/">Voltar ao Início</Link>
        </Button>
      </main>
    </div>
  )
}
