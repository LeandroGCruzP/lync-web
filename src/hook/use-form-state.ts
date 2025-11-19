import { FormEvent, useState, useTransition } from 'react'
import type { FormState } from '~/interfaces/form-state-interfaces'

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      errors: null,
      message: null,
      success: false,
    },
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      setFormState(state)

      if (state.success) {
        form.reset()
      }
    })
  }

  return [formState, handleSubmit, isPending] as const
}
