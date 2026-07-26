import { useEffect, useState } from 'react'

const SHEET_URL = 'https://opensheet.elk.sh/1RpAZ816MUyW1donE0owJTUvzFWsMNtTnCtti79csfQA/restaran'
export function useMenuData() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(SHEET_URL)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const raw = await res.json()

        const normalized = (Array.isArray(raw) ? raw : [])
          .map((row, i) => ({
            id: row.id?.toString().trim() || `row-${i}`,
            category: row.category?.toString().trim() || "Boshqa",
            name: row.name?.toString().trim() || 'Nomsiz taom',
            price: row.price ?? '',
            image: row.image?.toString().trim() || '',
            is_available: row.is_available,
          }))
          .filter((row) => row.name)

        if (!cancelled) {
          setItems(normalized)
          setStatus('ready')
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Menu fetch failed:', err)
          setStatus('error')
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { items, status }
}
