export const capitalize = (str: string) => {
  if (!str) return 'Unknown'
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatNumber = (value: string | number) => {
  if (!value || value === 'unknown' || value === 'n/a') return 'Unknown'
  const number = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value
  if (isNaN(number)) return 'Unknown'
  return new Intl.NumberFormat('en-US').format(number)
}

export const formatDistance = (value: string | number) => {
  if (!value || value === 'unknown' || value === 'n/a') return 'Unknown'
  const number = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value
  if (isNaN(number)) return 'Unknown'
  return `${formatNumber(value)} km`
}