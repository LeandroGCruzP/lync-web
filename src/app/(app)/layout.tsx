import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { isAuthenticated } from '~/auth/auth'

interface AuthLayoutProps {
  children: ReactNode
  sheet: ReactNode
}

export default async function AppLayout({ children, sheet }: AuthLayoutProps) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return <>
    {children}
    {sheet}
  </>
}
