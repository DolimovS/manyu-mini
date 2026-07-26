import { motion } from 'framer-motion'
import DishImage from './DishImage'
import { formatPrice, isStopList } from '../utils/menu'

export default function DishCard({ item }) {
  const stopList = isStopList(item.is_available)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      aria-disabled={stopList}
      className="flex items-center gap-4 rounded-2xl bg-zamin-paper p-3 shadow-card"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <DishImage
          src={item.image}
          name={item.name}
          className={`h-full w-full ${stopList ? 'grayscale opacity-50' : ''}`}
        />
        {stopList && (
          <span className="absolute inset-x-0 bottom-0 bg-zamin-ink/80 py-1 text-center text-[9px] font-bold uppercase tracking-wider text-zamin-cream">
            Tugagan
          </span>
        )}
      </div>

      <div className={`min-w-0 flex-1 ${stopList ? 'opacity-50' : ''}`}>
        <p className="truncate text-[15px] font-semibold text-zamin-ink">
          {item.name}
        </p>
        <p className="tabular mt-1 text-[14px] font-medium text-zamin-clay">
          {formatPrice(item.price)}
        </p>
      </div>

      {stopList && (
        <span className="shrink-0 rounded-full border border-zamin-clay/40 bg-zamin-clay/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zamin-clay">
          Stop-list
        </span>
      )}
    </motion.li>
  )
}
