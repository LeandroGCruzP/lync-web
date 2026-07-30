'use client'

import { useRouter } from 'next/navigation'
import type { Event } from '~/interfaces/event-interfaces'
import { UpdateEventForm } from './update-event-form'

interface UpdateEventFormSheetWrapperProps {
  event: Event
}

export function UpdateEventFormSheetWrapper({
  event,
}: UpdateEventFormSheetWrapperProps) {
  const router = useRouter()
  return <UpdateEventForm event={event} onSuccess={() => router.back()} />
}
