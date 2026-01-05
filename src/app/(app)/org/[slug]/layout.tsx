import { ReactNode } from 'react'
import { Header } from '~/components/header'
import { Tabs } from '~/components/tabs'

interface OrgLayoutProps {
  children: ReactNode
}

export default function OrgLayout({ children }: OrgLayoutProps) {
  return (
    <div className="space-y-4 p-4">
      <Header />

      <Tabs />

      <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
    </div>
  )
}
