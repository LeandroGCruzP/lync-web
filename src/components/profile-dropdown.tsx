'use client'

import { ChevronDown, LogOut, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface UserSession {
  avatarUrl?: string | null
  email?: string | null
  name?: string | null
}

interface ProfileDropdownProps {
  invitesCount: number
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

export function ProfileDropdown({ invitesCount, user }: ProfileDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

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
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href="/teams"
            onClick={() => setDropdownOpen(false)}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <Users className="mr-2 size-4" />
              Meus Times
            </div>
            {invitesCount > 0 && (
              <span className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-black">
                {invitesCount}
              </span>
            )}
          </Link>
        </DropdownMenuItem>

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
