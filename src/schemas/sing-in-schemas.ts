import z from "zod";

export const signInWithEmailSchema = z.object({
  email: z.email({ message: 'Please, provide a valid e-mail address' }),
  password: z.string().min(1, { message: 'Please, provide your password' }),
})
