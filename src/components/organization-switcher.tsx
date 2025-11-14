import { ChevronsUpDown, PlusCircle } from "lucide-react";
import Link from "next/link";
import { getCurrentOrgSlug } from "~/auth/auth";
import { getOrganizations } from "~/http/get-organizations";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export async function OrganizationSwitcher() {
  const orgSlug = await getCurrentOrgSlug()
  const { organizations } = await getOrganizations()

  const currentOrg = organizations.find((org) => org.slug === orgSlug)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrg ? (
          <>
            <Avatar className="size-5">
              {currentOrg.avatarUrl && <AvatarImage src={currentOrg.avatarUrl} />}
              <AvatarFallback></AvatarFallback>
            </Avatar>

            <span className="truncate text-left">{currentOrg.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Select Organization</span>
        )}

        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>

          {organizations.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link href={`/org/${organization.slug}`}>
                  <Avatar className="size-5 mr-2">
                    {organization.avatarUrl && <AvatarImage src={organization.avatarUrl} />}
                    <AvatarFallback></AvatarFallback>
                  </Avatar>

                  <span className="line-clamp-1">{organization.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/create-organization'>
            <div
              className="flex items-center justify-center mr-2"
              style={{
                height: 'calc(var(--spacing) * 5)',
                width: 'calc(var(--spacing) * 5)'
              }}
            >
              <PlusCircle className="size-4" />
            </div>
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
