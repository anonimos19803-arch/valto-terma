"use client"

interface AvailabilityBarProps {
  total: number
  booked: number
}

export default function AvailabilityBar({ total, booked }: AvailabilityBarProps) {
  const percentage = total > 0 ? Math.round((booked / total) * 100) : 0
  const available = total - booked

  let label: string
  let color: string
  let bg: string
  let dot: string

  if (percentage >= 100) {
    label = "Εξαντλήθηκαν"
    color = "text-red-400"
    bg = "bg-red-500"
    dot = "bg-red-500"
  } else if (percentage >= 70) {
    label = "Τελευταία τραπέζια"
    color = "text-amber-400"
    bg = "bg-amber-500"
    dot = "bg-amber-500"
  } else {
    label = "Διαθέσιμα τραπέζια"
    color = "text-emerald-400"
    bg = "bg-emerald-500"
    dot = "bg-emerald-500"
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="card px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
            <span className={`text-sm font-medium ${color}`}>{label}</span>
          </div>
          <p className="text-sm text-white/40">
            <span className="font-semibold text-white">{available}</span>
            <span> από {total}</span>
          </p>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${bg} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
