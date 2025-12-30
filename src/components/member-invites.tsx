import { ability, getCurrentOrgSlug } from '~/auth/auth'
import { getMemberInvites } from '~/http/get-member-invites'
import { CreateInviteForm } from './create-invite-form'
import { RevokeInviteButton } from './revoke-invite-button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableBody, TableCell, TableRow } from './ui/table'

export async function Invites() {
  const orgSlug = await getCurrentOrgSlug()
  const permissions = await ability()
  
  const { invites } = await getMemberInvites(orgSlug!)

  const canCreateMemberInvite = permissions?.can('create', 'MemberInvite')
  const canDeleteMemberInvite = permissions?.can('delete', 'MemberInvite')

  return (
    <div className="space-y-4">
      {canCreateMemberInvite && (
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
                    <span className="text-muted-foreground">
                      {invite.email}
                    </span>
                  </TableCell>
                  <TableCell className="py-2.5 font-medium">
                    {invite.role}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex justify-end">
                      {canDeleteMemberInvite && (
                        <RevokeInviteButton inviteId={invite.id} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}

            {invites.length === 0 && (
              <TableRow>
                <TableCell className="text-muted-foreground py-4 text-center">
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
