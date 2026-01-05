import { CreateEventForm } from '~/components/create-event-form'
import { InterceptedSheetContent } from '~/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '~/components/ui/sheet'

export default function CreateOrganizationSheetPage() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create event</SheetTitle>

          <div className="py-4">
            <CreateEventForm />
          </div>
        </SheetHeader>
      </InterceptedSheetContent>
    </Sheet>
  )
}
