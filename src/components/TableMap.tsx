"use client"

interface TableMapProps {
  totalTables: number
  bookedTables: number[]
  selectedTable: number | null
  onSelectTable: (tableNo: number) => void
}

export default function TableMap({
  totalTables,
  bookedTables,
  selectedTable,
  onSelectTable,
}: TableMapProps) {
  const tables = Array.from({ length: totalTables }, (_, i) => i + 1)

  return (
    <section className="px-6 py-16 max-w-3xl mx-auto" id="tables">
      <div className="text-center mb-10">
        <h2 className="section-title mb-3">
          Διάλεξε <span className="text-gradient">Τραπέζι</span>
        </h2>
        <p className="text-sm text-muted">Πάτα πάνω σε ένα διαθέσιμο τραπέζι</p>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {tables.map((tableNo) => {
          const isBooked = bookedTables.includes(tableNo)
          const isSelected = selectedTable === tableNo

          return (
            <button
              key={tableNo}
              disabled={isBooked}
              onClick={() => onSelectTable(tableNo)}
              className={`
                aspect-square flex flex-col items-center justify-center
                rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isBooked
                    ? "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
                    : isSelected
                    ? "bg-gradient-to-br from-accent to-pink-600 border border-accent/50 text-white scale-110 shadow-glow"
                    : "glass-card hover:bg-white/10 hover:border-accent/30 hover:scale-105 cursor-pointer"
                }
              `}
            >
              <span className={`text-lg font-bold ${isBooked ? "text-white/15" : isSelected ? "text-white" : "text-white/80"}`}>
                {tableNo}
              </span>
              {isBooked && (
                <svg className="w-3.5 h-3.5 text-white/15 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
              {isSelected && (
                <svg className="w-3.5 h-3.5 text-white mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
