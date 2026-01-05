'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { createEventAction } from '~/actions/create-event-actions'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useFormState } from '~/hook/use-form-state'
import { getSports } from '~/http/get-sports'
import { PaymentModel } from '~/interfaces/event-interfaces'
import { createEventSchema } from '~/schemas/event-schemas'
import { isRequiredField } from '~/utils/zod-utils'
import { Separator } from './ui/separator'

interface EventFormProps {
  organizationId?: string | null
}

export function CreateEventForm({ organizationId }: EventFormProps) {
  const [isNotFree, setIsNotFree] = useState(false)
  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(createEventAction)

  const { data: sportsData } = useQuery({
    queryFn: getSports,
    queryKey: ['sports'],
  })

  const nowLocal = new Date().toISOString().slice(0, 16)

  return (
    <div className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save event failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <CheckCircle2 className="size-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {organizationId && (
          <input type="hidden" name="organizationId" value={organizationId} />
        )}

        <div className="space-y-1">
          <Label
            required={isRequiredField(createEventSchema, 'name')}
            htmlFor="name"
          >
            Name
          </Label>
          <Input name="name" type="text" id="name" />

          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label
            required={isRequiredField(createEventSchema, 'description')}
            htmlFor="description"
          >
            Description
          </Label>
          <Input name="description" type="text" id="description" />

          {errors?.description && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.description[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label
              required={isRequiredField(createEventSchema, 'startDate')}
              htmlFor="startDate"
            >
              Start Date
            </Label>
            <Input
              name="startDate"
              type="datetime-local"
              id="startDate"
              defaultValue={nowLocal}
            />

            {errors?.startDate && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.startDate[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label
              required={isRequiredField(createEventSchema, 'endDate')}
              htmlFor="endDate"
            >
              End Date
            </Label>
            <Input name="endDate" type="datetime-local" id="endDate" />

            {errors?.endDate && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.endDate[0]}
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <Label
            required={isRequiredField(createEventSchema, 'sportId')}
            htmlFor="sportId"
          >
            Sport
          </Label>
          <select
            name="sportId"
            id="sportId"
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a sport</option>
            {sportsData?.sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>

          {errors?.sportId && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.sportId[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label
              required={isRequiredField(createEventSchema, 'slots')}
              htmlFor="slots"
            >
              Slots
            </Label>
            <Input name="slots" type="number" id="slots" />

            {errors?.slots && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.slots[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label
              required={isRequiredField(createEventSchema, 'playersPerTeam')}
              htmlFor="playersPerTeam"
            >
              Players per Team
            </Label>
            <Input name="playersPerTeam" type="number" id="playersPerTeam" />

            {errors?.playersPerTeam && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.playersPerTeam[0]}
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label
              required={isRequiredField(createEventSchema, 'paymentModel')}
              htmlFor="paymentModel"
            >
              Payment Model
            </Label>
            <select
              name="paymentModel"
              id="paymentModel"
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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

            {errors?.paymentModel && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.paymentModel[0]}
              </p>
            )}
          </div>

          {isNotFree && (
            <div className="space-y-1">
              <Label
                required={isRequiredField(createEventSchema, 'price')}
                htmlFor="price"
              >
                Price
              </Label>
              <Input name="price" type="number" id="price" step="0.01" />

              {errors?.price && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.price[0]}
                </p>
              )}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Save event'
          )}
        </Button>
      </form>
    </div>
  )
}
