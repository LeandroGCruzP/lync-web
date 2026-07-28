'use client'

import { ChevronDown, LogOut, Settings } from 'lucide-react'
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

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-muted-foreground text-xs">{user.email}</span>
        </div>

        <Avatar className="h-9 w-9">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          {user.name && (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>

        <ChevronDown className="text-muted-foreground size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
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
