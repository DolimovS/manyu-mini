import { SearchX } from 'lucide-react'

export default function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center px-8 py-20 text-center">
      <SearchX className="h-10 w-10 text-zamin-stone" strokeWidth={1.5} />
      <p className="mt-4 font-display text-lg font-semibold text-zamin-ink">
        Hech narsa topilmadi
      </p>
      <p className="mt-1 max-w-xs text-sm text-zamin-stone">
        {query
          ? `"${query}" bo'yicha taom topilmadi. Boshqa nom bilan qidirib ko'ring.`
          : "Bu bo'limda hozircha taomlar yo'q."}
      </p>
    </div>
  )
}
