import { ability, getCurrentOrgSlug } from "~/auth/auth"
import { CreateOrganizationForm } from "~/components/create-organization-form"
import { ShutdownOrganizationButton } from "~/components/shutdown-organization-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { getOrganization } from "~/http/get-organization"

export default async function SettingsPage() {
  const orgSlug = await getCurrentOrgSlug()
  const permissions = await ability()

  const canUpdateOrg = permissions?.can('update', 'Organization')
  const canShutdownOrg = permissions?.can('delete', 'Organization')

  const { organization } = await getOrganization(orgSlug!)

  return (
    <div className='space-y-4'>
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrg && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>Update your organization details</CardDescription>
            </CardHeader>

            <CardContent>
              <CreateOrganizationForm
                isUpdating
                initialData={{
                  domain: organization.domain,
                  name: organization.name,
                  shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
                }} />
            </CardContent>
          </Card>
        )}

        {canShutdownOrg && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown organization</CardTitle>
              <CardDescription>
                This will delete all organization data. You cannot undo this action.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
