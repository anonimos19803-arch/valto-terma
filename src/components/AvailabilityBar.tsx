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
  let urgency: string

  if (percentage >= 100) {
    label = "Εξαντλήθηκαν"
    color = "text-red-400"
    bg = "bg-red-500"
    dot = "bg-red-500"
    urgency = "Όλα τα τραπέζια έχουν κρατηθεί"
  } else if (percentage >= 80) {
    label = "Σχεδόν sold out!"
    color = "text-red-400"
    bg = "bg-red-500"
    dot = "bg-red-500"
    urgency = "Μην χάσεις τη θέση σου"
  } else if (percentage >= 60) {
    label = "Τελευταία τραπέζια"
    color = "text-amber-400"
    bg = "bg-amber-500"
    dot = "bg-amber-500"
    urgency = "Οι θέσεις γεμίζουν γρήγορα"
  } else {
    label = "Διαθέσιμα τραπέζια"
    color = "text-emerald-400"
    bg = "bg-emerald-500"
    dot = "bg-emerald-500"
    urgency = ""
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <div className="card px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
            <span className={`text-sm font-semibold ${color}`}>{label}</span>
          </div>
          <p className="text-sm text-white/40">
            <span className="font-bold text-white text-base">{available}</span>
            <span> / {total} διαθέσιμα</span>
          </p>
        </div>
        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${bg} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        {/* Social proof / urgency */}
        <div className="mt-3 flex items-center justify-between">
          {booked > 0 && (
            <p className="text-xs text-white/30 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-1.997M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              {booked} {booked === 1 ? "κράτηση" : "κρατήσεις"} μέχρι τώρα
            </p>
          )}
          {urgency && (
            <p className={`text-xs font-medium ${color}`}>
              {urgency}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
