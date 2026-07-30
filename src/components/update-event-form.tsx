'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { updateEventAction } from '~/actions/update-event-actions'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { getSports } from '~/http/get-sports'
import type { Event } from '~/interfaces/event-interfaces'
import { EventAccessType, PaymentModel } from '~/interfaces/event-interfaces'
import { updateEventSchema } from '~/schemas/event-schemas'
import { isRequiredField } from '~/utils/zod-utils'

interface UpdateEventFormProps {
  event: Event
  onSuccess?: () => void
}

export function UpdateEventForm({ event, onSuccess }: UpdateEventFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isNotFree, setIsNotFree] = useState(
    event.paymentModel !== PaymentModel.FREE,
  )
  const [formState, setFormState] = useState<{
    errors: Record<string, string[]> | null
    message: string | null
    success: boolean | null
  }>({
    errors: null,
    message: null,
    success: null,
  })

  const { data: sportsData } = useQuery({
    queryFn: getSports,
    queryKey: ['sports'],
  })

  // Format date strings for datetime-local input (YYYY-MM-DDThh:mm)
  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return ''
    try {
      return new Date(dateStr).toISOString().slice(0, 16)
    } catch {
      return ''
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const res = await updateEventAction(event.id, formData)
      setFormState({
        errors: res.errors as Record<string, string[]> | null,
        message: res.message,
        success: res.success,
      })

      if (res.success) {
        router.refresh()
        if (onSuccess) {
          onSuccess()
        }
      }
    })
  }

  return (
    <div className="space-y-4">
      {formState.success === false && formState.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Update event failed!</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      {formState.success === true && formState.message && (
        <Alert variant="success">
          <CheckCircle2 className="size-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-1">
          <Label
            required={isRequiredField(updateEventSchema, 'name')}
            htmlFor="update-name"
            className="text-white"
          >
            Name
          </Label>
          <Input
            name="name"
            type="text"
            id="update-name"
            defaultValue={event.name}
            className="border-white/10 bg-zinc-900 text-white"
          />

          {formState.errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label
            required={isRequiredField(updateEventSchema, 'description')}
            htmlFor="update-description"
            className="text-white"
          >
            Description
          </Label>
          <Input
            name="description"
            type="text"
            id="update-description"
            defaultValue={event.description ?? ''}
            className="border-white/10 bg-zinc-900 text-white"
          />

          {formState.errors?.description && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.description[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label
              required={isRequiredField(updateEventSchema, 'startDate')}
              htmlFor="update-startDate"
              className="text-white"
            >
              Start Date
            </Label>
            <Input
              name="startDate"
              type="datetime-local"
              id="update-startDate"
              defaultValue={formatDateTime(event.startDate)}
              className="border-white/10 bg-zinc-900 text-white"
            />

            {formState.errors?.startDate && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {formState.errors.startDate[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label
              required={isRequiredField(updateEventSchema, 'endDate')}
              htmlFor="update-endDate"
              className="text-white"
            >
              End Date
            </Label>
            <Input
              name="endDate"
              type="datetime-local"
              id="update-endDate"
              defaultValue={formatDateTime(event.endDate)}
              className="border-white/10 bg-zinc-900 text-white"
            />

            {formState.errors?.endDate && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {formState.errors.endDate[0]}
              </p>
            )}
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-1">
          <Label
            required={isRequiredField(updateEventSchema, 'sportId')}
            htmlFor="update-sportId"
            className="text-white"
          >
            Sport
          </Label>
          <select
            name="sportId"
            id="update-sportId"
            defaultValue={event.sport?.id ?? ''}
            className="focus-visible:ring-ring flex h-9 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-1 text-sm text-white shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            <option value="">Select a sport</option>
            {sportsData?.sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>

          {formState.errors?.sportId && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.sportId[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label
              required={isRequiredField(updateEventSchema, 'slots')}
              htmlFor="update-slots"
              className="text-white"
            >
              Slots
            </Label>
            <Input
              name="slots"
              type="number"
              id="update-slots"
              defaultValue={event.slots ?? ''}
              className="border-white/10 bg-zinc-900 text-white"
            />

            {formState.errors?.slots && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {formState.errors.slots[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label
              required={isRequiredField(updateEventSchema, 'playersPerTeam')}
              htmlFor="update-playersPerTeam"
              className="text-white"
            >
              Players per Team
            </Label>
            <Input
              name="playersPerTeam"
              type="number"
              id="update-playersPerTeam"
              defaultValue={event.playersPerTeam ?? ''}
              className="border-white/10 bg-zinc-900 text-white"
            />

            {formState.errors?.playersPerTeam && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {formState.errors.playersPerTeam[0]}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label
            required={isRequiredField(updateEventSchema, 'accessType')}
            htmlFor="update-accessType"
            className="text-white"
          >
            Access Type
          </Label>
          <select
            name="accessType"
            id="update-accessType"
            defaultValue={event.accessType}
            className="focus-visible:ring-ring flex h-9 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-1 text-sm text-white shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            <option value={EventAccessType.PUBLIC_OPEN}>
              Public (Open Registration)
            </option>
            <option value={EventAccessType.PUBLIC_READ_ONLY}>
              Public (Read-Only / View Only)
            </option>
            <option value={EventAccessType.INVITE_ONLY}>
              Private (Invite Only)
            </option>
            {event.organization && (
              <option value={EventAccessType.MEMBERS_ONLY}>Members Only</option>
            )}
          </select>

          {formState.errors?.accessType && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {formState.errors.accessType[0]}
            </p>
          )}
        </div>

        <Separator className="bg-white/10" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label
              required={isRequiredField(updateEventSchema, 'paymentModel')}
              htmlFor="update-paymentModel"
              className="text-white"
            >
              Payment Model
            </Label>
            <select
              name="paymentModel"
              id="update-paymentModel"
              defaultValue={event.paymentModel}
              className="focus-visible:ring-ring flex h-9 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-1 text-sm text-white shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
              onChange={(e) =>
                setIsNotFree(e.target.value !== PaymentModel.FREE)
              }
            >
              <option value={PaymentModel.FREE}>Free</option>
              <option value={PaymentModel.PAY_TO_REGISTER}>
                Pay to Register
              </option>
              <option value={PaymentModel.PAY_TO_CONFIRM}>
                Pay to Confirm
              </option>
            </select>

            {formState.errors?.paymentModel && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {formState.errors.paymentModel[0]}
              </p>
            )}
          </div>

          {isNotFree && (
            <div className="space-y-1">
              <Label
                required={isRequiredField(updateEventSchema, 'price')}
                htmlFor="update-price"
                className="text-white"
              >
                Price
              </Label>
              <Input
                name="price"
                type="number"
                id="update-price"
                step="0.01"
                defaultValue={event.price ? (event.price / 100).toString() : ''}
                className="border-white/10 bg-zinc-900 text-white"
              />

              {formState.errors?.price && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {formState.errors.price[0]}
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="bg-primary text-primary-foreground w-full font-bold"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </div>
  )
}
