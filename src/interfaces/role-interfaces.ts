import z from "zod";
import { roleSchema } from "~/schemas/role-schemas";

export type Role = z.infer<typeof roleSchema>
