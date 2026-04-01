'use client'

import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

interface ErrorPageProps {
  error: Error & { digest?: string }
}

export default function AppError({ error }: ErrorPageProps) {
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
    </div>
  )
}
