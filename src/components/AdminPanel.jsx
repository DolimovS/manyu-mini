import { useEffect, useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { formatPrice } from '../utils/menu'

const API_URL =
  'https://script.google.com/macros/s/AKfycbyNmSQ0jyK4GXG953p2kenfvwVQwihnQAa2Af7nq3rE6aDKvWe2IjigyO1pHOFe42c/exec'

export default function AdminPanel({ items, onClose, onSave }) {
  const [editedItems, setEditedItems] = useState(
    items.map((item) => ({
      ...item,
      price: String(item.price ?? ''),
      is_available: String(item.is_available).toLowerCase() === 'true',
    }))
  )
  const [isLoading, setIsLoading] = useState(false)
  const [savingIds, setSavingIds] = useState(new Set())

  useEffect(() => {
    setEditedItems(
      items.map((item) => ({
        ...item,
        price: String(item.price ?? ''),
        is_available: String(item.is_available).toLowerCase() === 'true',
      }))
    )
  }, [items])

  const handlePriceChange = (id, value) => {
    setEditedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: value } : item
      )
    )
  }

  const handleAvailabilityToggle = (id) => {
    setEditedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, is_available: !item.is_available }
          : item
      )
    )
  }

  const saveItem = async (item) => {
    const normalizedItem = {
      ...item,
      price: String(item.price ?? '').trim(),
      is_available: Boolean(item.is_available),
    }

    setSavingIds((prev) => new Set([...prev, item.id]))

    try {
      const url = new URL(API_URL)
      url.searchParams.append('action', 'update')
      url.searchParams.append('id', String(normalizedItem.id))
      if (normalizedItem.price !== undefined) {
        url.searchParams.append('price', String(normalizedItem.price))
      }
      if (normalizedItem.is_available !== undefined) {
        url.searchParams.append(
          'is_available',
          String(normalizedItem.is_available).toUpperCase()
        )
      }

      await fetch(url.toString(), {
        method: 'GET',
        mode: 'no-cors',
      })

      onSave({
        ...normalizedItem,
        price: normalizedItem.price,
        is_available: normalizedItem.is_available,
      })

      return true
    } catch (error) {
      console.error('Saqlashda xatolik:', error)
      return false
    } finally {
      setSavingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })
    }
  }

  const saveAll = async () => {
    setIsLoading(true)
    const changedItems = editedItems.filter((edited) => {
      const original = items.find((i) => i.id === edited.id)
      return (
        edited.price !== String(original.price ?? '') ||
        edited.is_available !== (String(original.is_available).toLowerCase() === 'true')
      )
    })

    for (const item of changedItems) {
      await saveItem(item)
    }

    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end overflow-y-auto bg-black/50 sm:items-center sm:justify-center sm:p-4">
      <div className="h-[90vh] w-full max-w-2xl overflow-hidden rounded-t-3xl bg-zamin-cream sm:rounded-2xl flex flex-col">
        {/* Header */}
        <div className="border-b border-zamin-creamDark px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="font-display text-lg font-semibold text-zamin-ink">
            Admin Panel - Taomlarni Tahrir
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="rounded-full p-1 text-zamin-stone transition-colors hover:text-zamin-ink"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="divide-y divide-zamin-creamDark">
            {editedItems.map((item) => {
              const isSaving = savingIds.has(item.id)
              const isChanged =
                item.price !== String(items.find((i) => i.id === item.id)?.price ?? '') ||
                item.is_available !==
                  (String(items.find((i) => i.id === item.id)?.is_available ?? '').toLowerCase() ===
                    'true')

              return (
                <div
                  key={item.id}
                  className="px-6 py-4 hover:bg-zamin-paper/50 transition-colors"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-zamin-ink truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-zamin-stone mt-1">{item.category}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Price Input */}
                    <div>
                      <label className="block text-xs font-medium text-zamin-stone mb-1.5">
                        Narx
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        placeholder="0"
                        className="w-full rounded-lg border border-zamin-creamDark bg-zamin-paper px-3 py-2 text-sm text-zamin-ink focus:border-zamin-gold focus:outline-none"
                        disabled={isSaving}
                      />
                    </div>

                    {/* Availability Toggle */}
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-zamin-stone">
                        Mavjudlik
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAvailabilityToggle(item.id)}
                        disabled={isSaving}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.is_available
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        } disabled:opacity-50`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            item.is_available ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Save Button */}
                    <button
                      type="button"
                      onClick={() => saveItem(item)}
                      disabled={isSaving || !isChanged}
                      className={`w-full rounded-lg py-2 text-sm font-semibold transition-all ${
                        isChanged && !isSaving
                          ? 'bg-zamin-gold text-zamin-ink hover:bg-zamin-gold/90'
                          : 'bg-zamin-gold/20 text-zamin-gold/50'
                      } disabled:opacity-50 flex items-center justify-center gap-2`}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saqlanmoqda...
                        </>
                      ) : (
                        'Saqlash'
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zamin-creamDark bg-zamin-paper px-6 py-4 shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-zamin-creamDark py-3 font-semibold text-zamin-ink transition-colors hover:bg-zamin-cream"
          >
            Yopish
          </button>
          <button
            type="button"
            onClick={saveAll}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-zamin-teal py-3 font-semibold text-zamin-cream transition-colors hover:enabled:bg-zamin-teal/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Barchasi Saqlanmoqda...
              </>
            ) : (
              'Barchasi Saqlash'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
