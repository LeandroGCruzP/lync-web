import {
  AbilityBuilder,
  type CreateAbility,
  createMongoAbility,
} from '@casl/ability'
import type { AppAbility } from '~/interfaces/abilities-interfaces'
import type { UserSchema } from '~/interfaces/user-interfaces'
import { permissions } from './permissions'

export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilitiesFor(user: UserSchema) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} are not defined`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  // bind methods to the ability instance to avoid losing context
  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
