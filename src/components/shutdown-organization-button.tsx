import { XCircle } from 'lucide-react'
import { shutdownOrganizationAction } from '~/actions/shutdown-organization-action'
import { Button } from './ui/button'

export function ShutdownOrganizationButton() {
  return (
    <form action={shutdownOrganizationAction.bind} className="mt-4">
      <Button type="submit" variant="destructive" className="w-56">
        <XCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
