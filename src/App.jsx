import { useEffect, useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import Splash from './components/Splash'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import CategorySection from './components/CategorySection'
import EmptyState from './components/EmptyState'
import CardSkeleton from './components/CardSkeleton'
import { useMenuData } from './hooks/useMenuData'
import {
  ALL_LABEL,
  isStopList,
  normalize,
  sortCategories,
} from './utils/menu'

const MIN_SPLASH_MS = 1600

export default function App() {
  const { items, status } = useMenuData()
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL)

  useEffect(() => {
    const t = setTimeout(() => setMinTimeElapsed(true), MIN_SPLASH_MS)
    return () => clearTimeout(t)
  }, [])

  const showSplash = status === 'loading' || !minTimeElapsed

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean))
    return sortCategories([...set])
  }, [items])

  const filtered = useMemo(() => {
    const q = normalize(query)
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === ALL_LABEL || item.category === activeCategory
      const matchesQuery = q === '' || normalize(item.name).includes(q)
      return matchesCategory && matchesQuery
    })
  }, [items, query, activeCategory])

  const visibleCategories =
    activeCategory === ALL_LABEL ? categories : [activeCategory]

  const grouped = useMemo(() => {
    return visibleCategories.map((cat) => {
      const list = filtered
        .filter((i) => i.category === cat)
        .sort(
          (a, b) =>
            Number(isStopList(a.is_available)) -
            Number(isStopList(b.is_available)),
        )
      return { category: cat, items: list }
    })
  }, [visibleCategories, filtered])

  const totalVisible = filtered.length

  return (
    <div className="min-h-screen bg-zamin-cream">
      <Splash visible={showSplash} />

      <div className="sticky top-0 z-30 shadow-sm">
        <Header query={query} onQueryChange={setQuery} />
        {categories.length > 0 && (
          <CategoryTabs
            categories={[ALL_LABEL, ...categories]}
            active={activeCategory}
            onSelect={setActiveCategory}
          />
        )}
      </div>

      <main className="mx-auto max-w-2xl px-5 pb-16 pt-6">
        {status === 'error' && (
          <div className="flex flex-col items-center px-8 py-20 text-center">
            <p className="font-display text-lg font-semibold text-zamin-ink">
              Menyuni yuklab bo'lmadi
            </p>
            <p className="mt-1 max-w-xs text-sm text-zamin-stone">
              Internet aloqasini tekshirib, qayta urinib ko'ring.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-zamin-teal px-5 py-2.5 text-sm font-semibold text-zamin-cream"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={2} />
              Qayta urinish
            </button>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {status === 'ready' && totalVisible === 0 && (
          <EmptyState query={query} />
        )}

        {status === 'ready' && totalVisible > 0 && (
          <div>
            {grouped.map(({ category, items: catItems }) => (
              <CategorySection
                key={category}
                category={category}
                items={catItems}
                showHeading={activeCategory === ALL_LABEL}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="pb-8 pt-2 text-center text-[11px] tracking-wide text-zamin-stone">
        Zamin · Milliylik va Zamonaviylik
      </footer>
    </div>
  )
}
