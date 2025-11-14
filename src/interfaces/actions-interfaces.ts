export type ActionResponse = {
  errors: Record<string, string[]> | null
  message: string | null
  success: boolean
}
