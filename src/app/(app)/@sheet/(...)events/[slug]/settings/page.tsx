import { redirect } from 'next/navigation'
import { InterceptedSheetContent } from '~/components/intercepted-sheet-content'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet'
import { UpdateEventFormSheetWrapper } from '~/components/update-event-form-sheet-wrapper'
import { getEvent } from '~/http/get-event'

interface SettingsSheetPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventSettingsSheetPage({
  params,
}: SettingsSheetPageProps) {
  const { slug } = await params
  let event
  try {
    const res = await getEvent(slug)
    event = res.event
  } catch {
    redirect('/')
  }

  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent className="w-full overflow-y-auto border-l border-white/10 bg-zinc-950 text-white sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl font-black tracking-tighter text-white uppercase italic">
            Configurações do <span className="text-primary">Evento</span>
          </SheetTitle>
          <SheetDescription className="text-zinc-400">
            Edite as informações e regras do seu evento esportivo.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <UpdateEventFormSheetWrapper event={event} />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
