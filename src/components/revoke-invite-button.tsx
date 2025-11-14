import { XOctagon } from "lucide-react"
import { revokeInviteAction } from "~/actions/revoke-invite-action"
import { Button } from "./ui/button"

interface RevokeInviteButtonProps {
  inviteId: string
}

export function RevokeInviteButton({ inviteId }: RevokeInviteButtonProps) {
  return (
    <form action={revokeInviteAction.bind(null, inviteId)}>
      <Button size='sm' variant='destructive'>
        <XOctagon className="size-4 mr-2" />
        Revoke invite
      </Button>
    </form>
  )
}

