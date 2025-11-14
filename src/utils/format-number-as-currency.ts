export function formatNumberAsCurrency(value: number) {
  return value.toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
  })
}
