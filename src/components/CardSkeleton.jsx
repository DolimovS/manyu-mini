export default function CardSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4 rounded-2xl bg-zamin-paper p-3 shadow-card">
      <div className="h-20 w-20 shrink-0 rounded-xl bg-zamin-creamDark" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-3/4 rounded bg-zamin-creamDark" />
        <div className="h-3.5 w-1/3 rounded bg-zamin-creamDark" />
      </div>
    </div>
  )
}
