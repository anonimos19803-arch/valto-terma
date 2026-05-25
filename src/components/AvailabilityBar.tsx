"use client"

interface AvailabilityBarProps {
  total: number
  booked: number
}

export default function AvailabilityBar({ total, booked }: AvailabilityBarProps) {
  const percentage = total > 0 ? Math.round((booked / total) * 100) : 0
  const available = total - booked

  let statusText: string
  let statusColor: string
  let dotColor: string

  if (percentage >= 100) {
    statusText = "Full"
    statusColor = "text-red-600"
    dotColor = "bg-red-600"
  } else if (percentage >= 70) {
    statusText = "Περιορισμένα"
    statusColor = "text-yellow-600"
    dotColor = "bg-yellow-500"
  } else {
    statusText = "Διαθέσιμο"
    statusColor = "text-green-600"
    dotColor = "bg-green-500"
  }

  return (
    <section className="px-6 py-12 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
          <span className={`text-sm font-medium ${statusColor}`}>{statusText}</span>
        </div>
        <span className="text-sm text-gray-400">
          {available} / {total} τραπέζια διαθέσιμα
        </span>
      </div>
      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  )
}
