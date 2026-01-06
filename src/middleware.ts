import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  const response = NextResponse.next()

  if (pathname.startsWith('/org')) {
    const [, , slug] = pathname.split('/')

    if (token) {
      try {
        const membershipResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/organizations/${slug}/membership`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!membershipResponse.ok) {
          return NextResponse.redirect(new URL('/', request.url))
        }
      } catch (err) {
        console.error('Middleware membership check failed:', err)
        // Optionally redirect or allow through if API is down
      }
    }

    response.cookies.set('org', slug)
  } else {
    response.cookies.delete('org')
  }

  return response
}

export const config = {
  matcher: [
    /**
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)',
  ],
}
