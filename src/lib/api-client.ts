import { type CookiesFn, getCookie } from 'cookies-next'
import ky from 'ky'
import { env } from '~/lib/env'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  // eslint-disable-next-line perfectionist/sort-objects
  hooks: {
    beforeRequest: [
      async (request) => {
        const isServer = typeof window === 'undefined'
        let cookieStore: CookiesFn | undefined

        if (isServer) {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }

        const token = await getCookie('token', { cookies: cookieStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
