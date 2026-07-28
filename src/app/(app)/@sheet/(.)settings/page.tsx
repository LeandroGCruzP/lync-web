import { auth } from '~/auth/auth'
import { InterceptedSheetContent } from '~/components/intercepted-sheet-content'
import { SettingsTabs } from '~/components/settings-tabs'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet'

export default async function SettingsSheetPage() {
  const { user } = await auth()

  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent className="bg-background/95 border-l border-white/5 p-6 backdrop-blur-md sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            Configurações
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Gerencie suas preferências de conta e aparência.
          </SheetDescription>
        </SheetHeader>
        <SettingsTabs user={user} />
      </InterceptedSheetContent>
    </Sheet>
  )
}
