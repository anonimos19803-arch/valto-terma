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
    <section className="max-w-2xl mx-auto px-6 py-12" id="tables">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-blue mb-2">
          Επιλογή Τραπεζιού
        </h2>
        <p className="text-sm text-gray-400">
          Επίλεξε ένα από τα διαθέσιμα τραπέζια
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mb-6 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border-2 border-gray-200 bg-white" />
          <span>Διαθέσιμο</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-brand-red" />
          <span>Επιλεγμένο</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gray-100" />
          <span>Κρατημένο</span>
        </div>
      </div>

      <div className="card p-5">
        <div className="grid grid-cols-5 gap-2.5">
          {tables.map((tableNo) => {
            const isBooked = bookedTables.includes(tableNo)
            const isSelected = selectedTable === tableNo

            return (
              <button
                key={tableNo}
                disabled={isBooked}
                onClick={() => onSelectTable(tableNo)}
                className={`
                  relative aspect-square flex items-center justify-center
                  rounded-lg text-sm font-semibold
                  transition-all duration-200
                  ${
                    isBooked
                      ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                      : isSelected
                      ? "bg-brand-red text-white shadow-md shadow-brand-red/25 scale-105"
                      : "bg-white border-2 border-gray-150 text-gray-600 hover:border-brand-blue hover:text-brand-blue hover:shadow-sm cursor-pointer"
                  }
                `}
              >
                {tableNo}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-2.5 h-2.5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
