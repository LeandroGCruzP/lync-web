'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AppError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <AlertTriangle className="text-muted-foreground size-12" />
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">
          Serviço temporariamente indisponível
        </h1>
        <p className="text-muted-foreground text-sm">
          Não foi possível conectar ao servidor. Tente novamente em instantes.
        </p>
      </div>
      <Button variant="outline" onClick={reset}>
        <RefreshCw className="mr-2 size-4" />
        Tentar novamente
      </Button>
    </div>
  )
}
