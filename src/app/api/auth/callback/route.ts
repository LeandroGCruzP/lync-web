import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { acceptMemberInvite } from '~/http/accept-invite'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found' },
      { status: 400 },
    )
  }

  const cookiesStore = await cookies()

  const inviteId = cookiesStore.get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptMemberInvite(inviteId)
      cookiesStore.delete('inviteId')
    } catch {}
  }

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = '' // Clear search params

  return NextResponse.redirect(redirectUrl)
}
