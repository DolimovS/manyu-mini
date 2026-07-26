import { AnimatePresence } from 'framer-motion'
import DishCard from './DishCard'

export default function CategorySection({ category, items, showHeading }) {
  if (items.length === 0) return null

  return (
    <section className="mb-8">
      {showHeading && (
        <div className="mb-3 flex items-center gap-3 px-1">
          <h2 className="font-display text-xl font-semibold text-zamin-teal">
            {category}
          </h2>
          <span className="h-px flex-1 bg-zamin-creamDark" />
          <span className="tabular text-xs font-medium text-zamin-stone">
            {items.length}
          </span>
        </div>
      )}
      <ul className="flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <DishCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </ul>
    </section>
  )
}
