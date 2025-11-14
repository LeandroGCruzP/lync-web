import z from "zod"
import { userSchema } from "~/schemas/user-schemas"

export type User = {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
}

export type UserSchema = z.infer<typeof userSchema>

