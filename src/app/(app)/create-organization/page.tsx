import { CreateOrganizationForm } from "~/components/create-organization-form";
import { Header } from "~/components/header";

export default function CreateOrganizationPage() {
  return (
    <div className='pt-4 space-y-4'>
      <Header />

      <main className='mx-auto w-full max-w-[1200px] space-y-4'>
        <h1 className="text-2xl font-bold">Create organization</h1>

        <CreateOrganizationForm />
      </main>
    </div>
  )
}
