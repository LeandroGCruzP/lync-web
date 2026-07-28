import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'
import Image from 'next/image'
import { removeMemberAction } from '~/actions/remove-member-action'
import { ability, getCurrentOrgSlug } from '~/auth/auth'
import { getMembers } from '~/http/get-members'
import { getMembership } from '~/http/get-membership'
import { getOrganization } from '~/http/get-organization'
import { organizationAuthSchema } from '~/schemas/organization-schemas'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableRow } from './ui/table'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const orgSlug = await getCurrentOrgSlug()
  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(orgSlug!),
    getMembers(orgSlug!),
    getOrganization(orgSlug!),
  ])

  const authOrg = organizationAuthSchema.parse(organization)

  const canTransferOwnershipOrg = permissions?.can(
    'transfer_ownership',
    authOrg,
  )
  const canRemoveUserOrg = permissions?.can('delete', 'User')
  const cannotUpdateUserOrg = permissions?.cannot('update', 'User')

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div>
        <Table>
          <TableBody>
            {members.map((member) => {
              const isOwnerOrSelf =
                member.userId === organization.ownerId ||
                member.userId === membership.userId

              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <Avatar>
                      <AvatarFallback />
                      {member.avatarUrl && (
                        <Image
                          src={member.avatarUrl}
                          width={32}
                          height={32}
                          alt=""
                          className="aspect-square size-full"
                        />
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-2 font-medium">
                        {member.name}
                        {member.userId === membership.userId && ' (me)'}
                        {member.userId === organization.ownerId && (
                          <span className="text-sx text-muted-foreground inline-flex items-center gap-1">
                            <Crown className="size-3" />
                            Owner
                          </span>
                        )}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {canTransferOwnershipOrg && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isOwnerOrSelf}
                        >
                          <ArrowLeftRight className="mr-2 size-4" />
                          Transfer Ownership
                        </Button>
                      )}

                      <UpdateMemberRoleSelect
                        memberId={member.id}
                        value={member.role}
                        disabled={isOwnerOrSelf || cannotUpdateUserOrg}
                      />

                      {canRemoveUserOrg && (
                        <form action={removeMemberAction.bind(null, member.id)}>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={isOwnerOrSelf}
                          >
                            <UserMinus className="mr-2 size-4" />
                            Remove
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
