export type ActionResponse = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}
