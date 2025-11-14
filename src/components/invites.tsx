import { ability, getCurrentOrgSlug } from "~/auth/auth"
import { getInvites } from "~/http/get-invites"
import { CreateInviteForm } from "./create-invite-form"
import { RevokeInviteButton } from "./revoke-invite-button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableRow } from "./ui/table"

export async function Invites() {
  const orgSlug = await getCurrentOrgSlug()
  const permissions = await ability()

  const { invites } = await getInvites(orgSlug!)

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>

          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        <Table>
          <TableBody>
            {invites.map((invite) => {
              return (
                <TableRow key={invite.id}>
                  <TableCell className="py-2.5">
                    <span className="text-muted-foreground">{invite.email}</span>
                  </TableCell>
                  <TableCell className="py-2.5 font-medium">
                    {invite.role}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex justify-end">
                      {permissions?.can('delete', 'Invite') && (
                        <RevokeInviteButton inviteId={invite.id} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}

            {invites.length === 0 && (
              <TableRow>
                <TableCell className="py-4 text-center text-muted-foreground">
                  No invites found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
