import { z } from 'zod'

export const createOrganizationSchema = z
  .object({
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (!value) return true

          const domainRegex =
            /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/
          return domainRegex.test(value)
        },
        { message: 'Invalid domain format.' },
      ),
    name: z
      .string()
      .min(3, { message: 'Name should be at least 3 characters long.' }),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'E-mail domain is required when auto join is enabled.',
      path: ['domain'],
    },
  )

export const organizationAuthSchema = z.object({
  __typename: z.literal('Organization').default('Organization'),
  id: z.string(),
  ownerId: z.string(),
})
