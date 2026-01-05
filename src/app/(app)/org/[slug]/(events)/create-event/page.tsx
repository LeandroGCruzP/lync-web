import { CreateEventForm } from '~/components/create-event-form'
import { getOrganization } from '~/http/get-organization'

interface CreateOrgEventPageProps {
  params: {
    slug: string
  }
}

export default async function CreateOrgEventPage({
  params,
}: CreateOrgEventPageProps) {
  const { organization } = await getOrganization(params.slug)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create event</h1>

      <CreateEventForm organizationId={organization.id} />
    </div>
  )
}
