import { Check, X, AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function Toast({ message, type = 'success', isVisible, onClose }) {
  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [isVisible, onClose])

  if (!isVisible) return null

  const bgColor =
    type === 'success'
      ? 'bg-green-50 border-green-200'
      : type === 'error'
        ? 'bg-red-50 border-red-200'
        : 'bg-amber-50 border-amber-200'

  const iconColor =
    type === 'success'
      ? 'text-green-600'
      : type === 'error'
        ? 'text-red-600'
        : 'text-amber-600'

  const Icon =
    type === 'success' ? Check : type === 'error' ? X : AlertCircle

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm animate-in slide-in-from-bottom fade-in duration-200">
      <div className={`border rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg ${bgColor}`}>
        <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} strokeWidth={2} />
        <p className={`text-sm font-medium ${iconColor}`}>{message}</p>
      </div>
    </div>
  )
}
