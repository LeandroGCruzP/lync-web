import { z, ZodDefault, ZodNullable, ZodOptional } from 'zod'

export function isRequiredField<TShape extends z.ZodRawShape>(
  schema: z.ZodObject<TShape>,
  fieldName: keyof TShape,
) {
  const fieldSchema = schema.shape[fieldName]

  return !(
    fieldSchema instanceof ZodOptional ||
    fieldSchema instanceof ZodNullable ||
    fieldSchema instanceof ZodDefault
  )
}

export const ISODate = z
  .string()
  .transform((value) => {
    const date = new Date(value)
    return date.toISOString()
  })
  .pipe(z.iso.datetime({ offset: true }))
