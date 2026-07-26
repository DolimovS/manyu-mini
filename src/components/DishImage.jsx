import { useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'
import { hashString } from '../utils/menu'

const GRADIENTS = [
  ['#1B4B48', '#2C6B65'],
  ['#A8512F', '#C89B3C'],
  ['#0F332F', '#1B4B48'],
  ['#C89B3C', '#E4C374'],
  ['#2C6B65', '#C89B3C'],
]

function initials(name) {
  return String(name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function DishImage({ src, name, className = '' }) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed
  const [from, to] = GRADIENTS[hashString(name) % GRADIENTS.length]

  if (showPlaceholder) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        role="img"
        aria-label={name}
      >
        <UtensilsCrossed
          className="absolute -bottom-2 -right-2 h-12 w-12 text-white/15"
          strokeWidth={1.5}
        />
        <span className="font-display text-xl font-semibold tracking-wide text-white/90">
          {initials(name)}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      onLoad={() => setFailed(false)}
      className={`object-cover ${className}`}
    />
  )
}
