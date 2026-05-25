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
  let barGradient: string

  if (percentage >= 100) {
    statusText = "Sold Out"
    statusColor = "text-red-400"
    barGradient = "from-red-500 to-red-400"
  } else if (percentage >= 70) {
    statusText = "Σχεδόν Full"
    statusColor = "text-sunset"
    barGradient = "from-sunset to-accent"
  } else {
    statusText = "Διαθέσιμο"
    statusColor = "text-ocean"
    barGradient = "from-ocean to-sky"
  }

  return (
    <section className="px-6 py-12 max-w-2xl mx-auto">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${percentage >= 100 ? 'bg-red-400' : percentage >= 70 ? 'bg-sunset' : 'bg-ocean'} animate-pulse`} />
            <span className={`text-sm font-semibold ${statusColor}`}>{statusText}</span>
          </div>
          <span className="text-sm text-muted">
            <span className="text-white font-semibold">{available}</span> / {total} τραπέζια
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${barGradient} rounded-full transition-all duration-1000 ease-out shadow-lg`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  )
}
