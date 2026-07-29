'use client'

import { Slash } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TeamBreadcrumbsProps {
  organizationSlug?: string | null
  teamName: string
  teamSlug: string
}

export function TeamBreadcrumbs({
  organizationSlug,
  teamName,
  teamSlug,
}: TeamBreadcrumbsProps) {
  const pathname = usePathname()

  // Determine back link target based on sub-routes
  const isMembers = pathname.endsWith('/members')
  const isSettings = pathname.endsWith('/settings')

  const rootHref = organizationSlug
    ? `/org/${organizationSlug}/teams`
    : '/teams'
  const backHref = isMembers || isSettings ? `/teams/${teamSlug}` : rootHref

  return (
    <div className="flex items-center gap-3 px-4 text-sm">
      {/* Breadcrumb Hierarchy */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={rootHref} className="transition-colors hover:text-white">
          Times
        </Link>

        <Slash className="size-3 shrink-0 -rotate-45 text-white/10" />

        {isMembers || isSettings ? (
          <>
            <Link
              href={`/teams/${teamSlug}`}
              className="transition-colors hover:text-white"
            >
              {teamName}
            </Link>

            <Slash className="size-3 shrink-0 -rotate-45 text-white/10" />

            <span className="font-medium text-zinc-200">
              {isMembers ? 'Membros' : 'Configurações'}
            </span>
          </>
        ) : (
          <span className="font-medium text-zinc-200">{teamName}</span>
        )}
      </div>
    </div>
  )
}
