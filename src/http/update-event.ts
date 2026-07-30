import { api } from '~/lib/api-client'

export async function updateEvent(id: string, data: any): Promise<void> {
  await api.put(`events/${id}`, {
    json: data,
  })
}
