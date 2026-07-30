import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { isAuthenticated } from '~/auth/auth'

interface AuthLayoutProps {
  children: ReactNode
  sheet: ReactNode
}

function isPublicPath(pathname: string): boolean {
  // Matches /events/[slug]
  if (/^\/events\/[^/]+$/.test(pathname)) {
    return true
  }
  // Matches /org/[slug]/events/[event_slug]
  if (/^\/org\/[^/]+\/events\/[^/]+$/.test(pathname)) {
    return true
  }
  return false
}

export default async function AppLayout({ children, sheet }: AuthLayoutProps) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''

  if (!isPublicPath(pathname) && !(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}
