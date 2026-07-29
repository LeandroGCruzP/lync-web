import { CreateTeamForm } from '~/components/create-team-form'
import { getOrganization } from '~/http/get-organization'

interface CreateOrgTeamPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CreateOrgTeamPage({
  params,
}: CreateOrgTeamPageProps) {
  const { slug } = await params
  const { organization } = await getOrganization(slug)

  return (
    <div className="mx-auto max-w-lg space-y-6 py-10">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-black tracking-wider text-white uppercase italic">
          Criar Novo <span className="text-primary">Time</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Defina o nome e o lema da equipe nesta organização
        </p>
      </div>

      <CreateTeamForm
        organizationId={organization.id}
        organizationSlug={slug}
      />
    </div>
  )
}
