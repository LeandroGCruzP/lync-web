import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getMembership } from '~/http/get-membership'
import { getProfile } from '~/http/get-profile'
import { defineAbilitiesFor } from '~/roles/define-abilities'

/** Check if the user is authenticated from cookies */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}

/** Get the current organization slug from cookies */
export async function getCurrentOrgSlug(): Promise<string | null> {
  const cookiesStore = await cookies()
  return cookiesStore.get('org')?.value ?? null
}

/** Get the current membership from API */
export async function getCurrentMembership() {
  const org = await getCurrentOrgSlug()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)
  return membership
}

/** Get the current user's permissions */
export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilitiesFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

/** Get the current authenticated user or redirect to sign-in */
export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (err) {
    if (
      err instanceof HTTPError &&
      (err.response.status === 401 || err.response.status === 400)
    ) {
      redirect('/api/auth/sign-out')
    }

    // Server error (5xx) or network error — do not sign out the user
    throw err
  }
}
