import z from "zod"
import { userSchema } from "~/schemas/user-schemas"

export type User = {
  avatarUrl: string | null
  email: string
  id: string
  name: string | null
}

export type UserSchema = z.infer<typeof userSchema>

