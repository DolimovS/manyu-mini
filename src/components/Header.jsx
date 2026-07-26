import { Search, X, Settings2 } from 'lucide-react'

export default function Header({ query, onQueryChange, onAdminClick }) {
  return (
    <header className="bg-zamin-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 pt-5">
        <div>
          <h1 className="font-display text-[28px] font-semibold leading-none text-zamin-teal">
            Zamin
          </h1>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-zamin-stone">
            Milliylik va Zamonaviylik
          </p>
        </div>
        <button
          type="button"
          onClick={onAdminClick}
          aria-label="Admin"
          title="Admin rejim"
          className="rounded-full p-2.5 text-zamin-stone transition-all hover:bg-zamin-paper hover:text-zamin-gold active:scale-95"
        >
          <Settings2 className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <div className="mx-auto max-w-2xl px-5 pb-3 pt-4">
        <div className="flex items-center gap-2 rounded-2xl border border-zamin-creamDark bg-zamin-paper px-4 py-3 shadow-card transition-colors focus-within:border-zamin-gold">
          <Search className="h-4 w-4 shrink-0 text-zamin-stone" strokeWidth={2} />
          <input
            type="text"
            inputMode="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Taom qidirish..."
            className="w-full bg-transparent text-[15px] text-zamin-ink placeholder:text-zamin-stone/80 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Qidiruvni tozalash"
              className="shrink-0 rounded-full p-0.5 text-zamin-stone transition-colors hover:text-zamin-clay"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      <div className="ikat-strip-soft" />
    </header>
  )
}
