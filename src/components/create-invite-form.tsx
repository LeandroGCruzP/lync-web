'use client'

import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'
import { createInviteAction } from '~/actions/create-invite-action'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useFormState } from '~/hook/use-form-state'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export function CreateInviteForm() {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createInviteAction
  )

  return (
    <div className='space-y-4'>
      {success === false && message && (
        <Alert variant='destructive'>
          <AlertTriangle className='size-4' />
          <AlertTitle>Invite failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className="flex items-center gap-2">
          <div className='space-y-1 flex-1'>
            <Input name='email' type='email' id='email' placeholder='john@example.com' />

            {errors?.email && (
              <p className='text-xs font-medium text-red-500 dark:text-red-400'>
                {errors.email[0]}
              </p>
            )}
          </div>

          <Select name='role' defaultValue='MEMBER'>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='ADMIN'>Admin</SelectItem>
              <SelectItem value='MEMBER'>Member</SelectItem>
            </SelectContent>
          </Select>

          <Button type='submit' disabled={isPending}>
            {isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <>
                <UserPlus className='size-4' />
                Invite user
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
