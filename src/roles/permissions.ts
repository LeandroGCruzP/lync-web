import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '~/interfaces/abilities-interfaces'
import type { Role } from '~/interfaces/role-interfaces'
import type { UserSchema } from '~/interfaces/user-interfaces'

type PermissionsByRole = (
  user: UserSchema,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  MEMBER(_, { can }) {
    can('get', 'User')
  }
}
