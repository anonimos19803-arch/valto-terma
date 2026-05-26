"use client"

interface AvailabilityBarProps {
  total: number
  booked: number
}

export default function AvailabilityBar({ total, booked }: AvailabilityBarProps) {
  const percentage = total > 0 ? Math.round((booked / total) * 100) : 0
  const available = total - booked

  let statusText: string
  let dotColor: string
  let barColor: string

  if (percentage >= 100) {
    statusText = "Sold Out"
    dotColor = "bg-cherry"
    barColor = "bg-cherry"
  } else if (percentage >= 70) {
    statusText = "Σχεδόν Full"
    dotColor = "bg-orange-400"
    barColor = "bg-gradient-to-r from-orange-400 to-cherry"
  } else {
    statusText = "Διαθέσιμο"
    dotColor = "bg-emerald-500"
    barColor = "bg-gradient-to-r from-emerald-400 to-royal"
  }

  return (
    <section className="px-6 py-10 max-w-2xl mx-auto">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${dotColor} animate-pulse`} />
            <span className="text-sm font-semibold text-royal">{statusText}</span>
          </div>
          <span className="text-sm text-royal/50">
            <span className="text-royal font-bold">{available}</span> / {total} τραπέζια
          </span>
        </div>
        <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  )
}
