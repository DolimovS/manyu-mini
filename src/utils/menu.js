export const CATEGORY_ORDER = [
  'Issiq taomlar',
  'Salatlar',
  'Ichimliklar',
  'Fast Food',
  'Dessertlar',
]

export const ALL_LABEL = 'Barchasi'

export function isStopList(value) {
  return String(value ?? '').trim().toLowerCase() === 'false'
}

export function sortCategories(categories) {
  const known = CATEGORY_ORDER.filter((c) => categories.includes(c))
  const rest = categories
    .filter((c) => !CATEGORY_ORDER.includes(c))
    .sort((a, b) => a.localeCompare(b, 'uz'))
  return [...known, ...rest]
}

export function formatPrice(price) {
  const digits = String(price ?? '').replace(/[^\d.-]/g, '')
  const num = Number(digits)
  if (!digits || Number.isNaN(num)) return String(price ?? '')
  const formatted = num.toLocaleString('ru-RU').replace(/\u00A0/g, ' ')
  return `${formatted} so'm`
}

export function normalize(text) {
  return String(text ?? '').toLocaleLowerCase('en').trim()
}

export function hashString(str) {
  let h = 0
  const s = String(str ?? '')
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}
