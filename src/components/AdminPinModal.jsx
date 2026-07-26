import { useState, useEffect } from 'react'
import { X, Lock } from 'lucide-react'

const DEFAULT_PIN = '1234'

export default function AdminPinModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setPin('')
      setError('')
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (pin === DEFAULT_PIN) {
      setIsLoading(false)
      onSuccess()
      setPin('')
    } else {
      setError('PIN noto\'g\'ri')
      setPin('')
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-zamin-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-zamin-creamDark px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zamin-gold/20">
              <Lock className="h-5 w-5 text-zamin-gold" strokeWidth={2} />
            </div>
            <h2 className="font-display text-lg font-semibold text-zamin-ink">
              Admin Kirish
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="rounded-full p-1 text-zamin-stone transition-colors hover:text-zamin-ink"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="mb-4 text-sm text-zamin-stone">
            Admin paneliga kirish uchun PIN-ni kiriting
          </p>

          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value)
                if (error) setError('')
              }}
              placeholder="PIN-ni kiriting"
              className={`w-full rounded-lg border-2 px-4 py-3 text-center text-2xl font-mono letter-spacing-widest bg-zamin-paper transition-colors focus:outline-none ${
                error
                  ? 'border-red-400/50 focus:border-red-400'
                  : 'border-zamin-creamDark focus:border-zamin-gold'
              }`}
              disabled={isLoading}
              autoComplete="off"
              maxLength="6"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || pin.length === 0}
            className="mt-6 w-full rounded-lg bg-zamin-teal py-3 font-semibold text-zamin-cream transition-all hover:enabled:bg-zamin-teal/90 disabled:opacity-50"
          >
            {isLoading ? 'Tekshirilmoqda...' : 'Kirish'}
          </button>
        </form>
      </div>
    </div>
  )
}
