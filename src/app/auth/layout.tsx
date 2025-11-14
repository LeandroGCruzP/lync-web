import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { isAuthenticated } from '~/auth/auth'

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const isUserAuthenticated = await isAuthenticated()

  if (isUserAuthenticated) {
    redirect('/')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-xs'>{children}</div>
    </div>
  )
}
