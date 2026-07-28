export function formatPrice(price: number | null) {
  return price
    ? new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      }).format(price / 100)
    : null
}
