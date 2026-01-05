/**
 * Removes empty values from a FormData object
 * @param formData FormData object to clean
 * @returns Cleaned FormData object
 */
export function cleanFormData(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).filter(([_, value]) => value !== ''),
  )
}
