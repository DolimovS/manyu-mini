export default function CategoryTabs({ categories, active, onSelect }) {
  return (
    <div className="border-b border-zamin-creamDark/70 bg-zamin-cream/95 backdrop-blur-sm">
      <div className="mx-auto max-w-2xl overflow-x-auto px-5 py-3 no-scrollbar">
        <div className="flex w-max gap-2">
          {categories.map((cat) => {
            const isActive = cat === active
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelect(cat)}
                aria-pressed={isActive}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-zamin-teal text-zamin-cream shadow-pill'
                    : 'bg-zamin-paper text-zamin-teal/80 hover:bg-zamin-creamDark'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
