import z from "zod";
import { roleSchema } from "./role-schemas";

export const createInviteSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  role: roleSchema
})
