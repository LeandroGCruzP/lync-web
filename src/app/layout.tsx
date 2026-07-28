import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import { Providers } from './providers'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  description: 'Sports social network',
  title: 'Lync',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
