import { auth } from '~/auth/auth'
import { Header } from '~/components/header'
import { SettingsTabs } from '~/components/settings-tabs'

export default async function SettingsPage() {
  const { user } = await auth()

  return (
    <div className="space-y-4 p-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Configurações</h1>

        <div className="bg-background/50 rounded-xl border border-white/5 p-6">
          <SettingsTabs user={user} />
        </div>
      </main>
    </div>
  )
}
