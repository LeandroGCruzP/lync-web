import { CreateEventForm } from '~/components/create-event-form'
import { getOrganization } from '~/http/get-organization'

interface CreateOrgEventPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CreateOrgEventPage({
  params,
}: CreateOrgEventPageProps) {
  const { slug } = await params
  const { organization } = await getOrganization(slug)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create event</h1>

      <CreateEventForm organizationId={organization.id} />
    </div>
  )
}
