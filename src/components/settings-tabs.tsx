'use client'

import { Laptop, Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserSession {
  avatarUrl?: string | null
  email?: string | null
  name?: string | null
}

interface SettingsTabsProps {
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

export function SettingsTabs({ user }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'appearance'>(
    'account',
  )
  const { setTheme, theme } = useTheme()

  return (
    <div className="mt-4 flex flex-1 flex-col gap-6 md:flex-row">
      {/* Sidebar Tabs */}
      <div className="flex w-full gap-1 border-b border-white/5 pb-2 md:w-36 md:flex-col md:border-r md:border-b-0 md:pr-4 md:pb-0">
        <button
          onClick={() => setActiveTab('account')}
          className={cn(
            'flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors md:justify-start',
            activeTab === 'account'
              ? 'text-foreground bg-white/5'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
          )}
        >
          <User className="size-4" />
          Conta
        </button>
        <button
          onClick={() => setActiveTab('appearance')}
          className={cn(
            'flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors md:justify-start',
            activeTab === 'appearance'
              ? 'text-foreground bg-white/5'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
          )}
        >
          <Sun className="size-4" />
          Aparência
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto pr-1">
        {activeTab === 'account' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-foreground text-lg font-medium">
                Informações da Conta
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Seus dados de perfil público do sistema.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                  {user.name && (
                    <AvatarFallback className="text-lg">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h4 className="text-foreground font-semibold">{user.name}</h4>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Nome
                </label>
                <input
                  type="text"
                  value={user.name || ''}
                  disabled
                  className="text-muted-foreground w-full cursor-not-allowed rounded-lg border border-white/5 bg-white/2 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  E-mail
                </label>
                <input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="text-muted-foreground w-full cursor-not-allowed rounded-lg border border-white/5 bg-white/2 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-foreground text-lg font-medium">
                Tema do Sistema
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Escolha como o sistema deve ser exibido para você.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Light Theme Card */}
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-xl border p-4 text-left transition-all hover:bg-white/2',
                  theme === 'light'
                    ? 'border-primary bg-primary/5 ring-primary/20 ring-1'
                    : 'border-white/5 bg-white/2',
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                    <Sun className="size-5" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Tema Claro
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Ideal para ambientes bem iluminados.
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full border',
                    theme === 'light'
                      ? 'border-primary bg-primary'
                      : 'border-white/20',
                  )}
                >
                  {theme === 'light' && (
                    <div className="bg-background h-1.5 w-1.5 rounded-full" />
                  )}
                </div>
              </button>

              {/* Dark Theme Card */}
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-xl border p-4 text-left transition-all hover:bg-white/2',
                  theme === 'dark'
                    ? 'border-primary bg-primary/5 ring-primary/20 ring-1'
                    : 'border-white/5 bg-white/2',
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Moon className="size-5" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Tema Escuro
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Fácil para os olhos, reduz a fadiga ocular.
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full border',
                    theme === 'dark'
                      ? 'border-primary bg-primary'
                      : 'border-white/20',
                  )}
                >
                  {theme === 'dark' && (
                    <div className="bg-background h-1.5 w-1.5 rounded-full" />
                  )}
                </div>
              </button>

              {/* System Theme Card */}
              <button
                onClick={() => setTheme('system')}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-xl border p-4 text-left transition-all hover:bg-white/2',
                  theme === 'system'
                    ? 'border-primary bg-primary/5 ring-primary/20 ring-1'
                    : 'border-white/5 bg-white/2',
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Laptop className="size-5" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Tema do Sistema
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Adapta-se às configurações do seu dispositivo.
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full border',
                    theme === 'system'
                      ? 'border-primary bg-primary'
                      : 'border-white/20',
                  )}
                >
                  {theme === 'system' && (
                    <div className="bg-background h-1.5 w-1.5 rounded-full" />
                  )}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
