'use client'

import { Settings } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { UpdateEventForm } from '~/components/update-event-form'
import type { Event } from '~/interfaces/event-interfaces'

interface EventConfigSheetProps {
  event: Event
  variant?: 'default' | 'card'
}

export function EventConfigSheet({
  event,
  variant = 'default',
}: EventConfigSheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {variant === 'card' ? (
          <Button
            size="sm"
            className="flex h-6 cursor-pointer items-center justify-center gap-1 rounded-full border border-white/10 bg-zinc-900 px-3 text-[10px] font-bold tracking-widest text-white uppercase shadow-sm transition-all hover:border-white/20 hover:bg-zinc-800 active:scale-95"
          >
            <Settings className="size-3" /> Configurar
          </Button>
        ) : (
          <Button
            size="lg"
            className="flex h-16 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 px-12 text-xl font-black tracking-widest text-white uppercase shadow-2xl transition-all hover:scale-105 hover:bg-zinc-800 active:scale-95"
          >
            <Settings className="mr-2 size-5" /> Configurar
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto border-l border-white/10 bg-zinc-950 text-white sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl font-black tracking-tighter text-white uppercase italic">
            Configurações do <span className="text-primary">Evento</span>
          </SheetTitle>
          <SheetDescription className="text-zinc-400">
            Edite as informações e regras do seu evento esportivo.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <UpdateEventForm event={event} onSuccess={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
