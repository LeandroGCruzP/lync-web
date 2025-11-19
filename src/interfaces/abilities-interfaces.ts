import { MongoAbility } from '@casl/ability'
import { z } from 'zod'
import { AppAbilitiesSchema } from '~/schemas/abilities-schemas'

type AppAbilitiesSchema = z.infer<typeof AppAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilitiesSchema>
