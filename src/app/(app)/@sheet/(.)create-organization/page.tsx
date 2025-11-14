import { CreateOrganizationForm } from "~/components/create-organization-form";
import { InterceptedSheetContent } from "~/components/intercepted-sheet-content";
import { Sheet, SheetHeader, SheetTitle } from "~/components/ui/sheet";

export default function CreateOrganizationSheetPage() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>

          <div className="py-4">
            <CreateOrganizationForm />
          </div>
        </SheetHeader>
      </InterceptedSheetContent>
    </Sheet>
  )
}
