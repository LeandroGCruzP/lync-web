'use client'

import {
  Building2,
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface UserSession {
  avatarUrl?: string | null
  email?: string | null
  name?: string | null
}

interface OrganizationItem {
  avatarUrl: string | null
  id: string
  name: string
  slug: string
}

interface TeamItem {
  avatarUrl: string | null
  id: string
  name: string
  slug: string
}

interface ProfileDropdownProps {
  invitesCount: number
  organizations: OrganizationItem[]
  orgSlug: string | null
  teams: TeamItem[]
  user: UserSession
}

function getInitials(name: string) {
  const initial = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initial
}

export function ProfileDropdown({
  invitesCount,
  organizations,
  orgSlug,
  teams,
  user,
}: ProfileDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const currentOrg = organizations.find((org) => org.slug === orgSlug)

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-muted-foreground text-xs">{user.email}</span>
        </div>

        <div className="relative">
          <Avatar className="h-9 w-9">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
            {user.name && (
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
          {invitesCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary relative inline-flex h-2.5 w-2.5 rounded-full"></span>
            </span>
          )}
        </div>

        <ChevronDown className="text-muted-foreground size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <Users className="mr-2 size-4" />
            <span>Times</span>
            {invitesCount > 0 && (
              <span className="bg-primary ml-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-black">
                {invitesCount}
              </span>
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-[200px]">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/teams"
                  onClick={() => setDropdownOpen(false)}
                  className="flex w-full items-center"
                >
                  <Users className="mr-2 size-4" />
                  Ver todos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="max-h-[240px] overflow-y-auto">
                <DropdownMenuLabel>Meus Times</DropdownMenuLabel>
                {teams.length === 0 ? (
                  <span className="text-muted-foreground block px-2 py-1 text-xs">
                    Nenhum time encontrado
                  </span>
                ) : (
                  teams.map((team) => (
                    <DropdownMenuItem
                      key={team.id}
                      asChild
                      className="cursor-pointer"
                    >
                      <Link
                        href={`/teams/${team.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex w-full items-center"
                      >
                        <Avatar className="mr-2 size-5">
                          {team.avatarUrl && (
                            <AvatarImage src={team.avatarUrl} />
                          )}
                          <AvatarFallback>
                            {getInitials(team.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="line-clamp-1">{team.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/teams/create"
                  onClick={() => setDropdownOpen(false)}
                  className="flex w-full items-center"
                >
                  <PlusCircle className="mr-2 size-4" />
                  Criar time
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <Building2 className="mr-2 size-4" />
            <span>Organizações</span>
            {currentOrg && (
              <span className="text-muted-foreground mr-1 ml-auto max-w-[80px] truncate text-xs">
                {currentOrg.name}
              </span>
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-[200px]">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                {organizations.map((organization) => {
                  return (
                    <DropdownMenuItem
                      key={organization.id}
                      asChild
                      className="cursor-pointer"
                    >
                      <Link
                        href={`/org/${organization.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex w-full items-center"
                      >
                        <Avatar className="mr-2 size-5">
                          {organization.avatarUrl && (
                            <AvatarImage src={organization.avatarUrl} />
                          )}
                          <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <span className="line-clamp-1">
                          {organization.name}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/create-organization"
                  onClick={() => setDropdownOpen(false)}
                  className="flex w-full items-center"
                >
                  <PlusCircle className="mr-2 size-4" />
                  Create new
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href="/settings"
            onClick={() => setDropdownOpen(false)}
            className="flex w-full items-center"
          >
            <Settings className="mr-2 size-4" />
            Configurações
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <a href="/api/auth/sign-out" className="flex w-full items-center">
            <LogOut className="text-destructive mr-2 size-4" />
            <span className="text-destructive">Sign out</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
