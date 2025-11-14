export interface FormState {
  errors: Record<string, string[]> | null
  message: string | null
  success: boolean
}
