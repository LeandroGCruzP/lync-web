import z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, provide your full name.',
    }),
    email: z.email({ message: 'Please, provide a valid e-mail address.' }),
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'],
  })
