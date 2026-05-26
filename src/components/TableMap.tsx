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
    <section className="max-w-3xl mx-auto px-6 py-12" id="tables">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Διάλεξε Τραπέζι
        </h2>
        <p className="text-sm text-white/40">
          Πάτα πάνω σε ένα διαθέσιμο τραπέζι για να το κρατήσεις
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mb-6 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full border-2 border-white/20 bg-white/5" />
          <span>Διαθέσιμο</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brand-red shadow-lg shadow-brand-red/30" />
          <span>Επιλεγμένο</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-white/5 border border-white/5" />
          <span>Κρατημένο</span>
        </div>
      </div>

      {/* Floor plan */}
      <div className="card p-6 md:p-8">
        {/* Stage / DJ area */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/30 rounded-full px-5 py-2">
            <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
            </svg>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-red">Stage / DJ</span>
          </div>
        </div>

        {/* Tables grid — round tables */}
        <div className="grid grid-cols-5 gap-4 md:gap-5 max-w-xl mx-auto">
          {tables.map((tableNo) => {
            const isBooked = bookedTables.includes(tableNo)
            const isSelected = selectedTable === tableNo

            return (
              <button
                key={tableNo}
                disabled={isBooked}
                onClick={() => onSelectTable(tableNo)}
                className="flex flex-col items-center gap-1.5 group"
              >
                {/* Table circle */}
                <div
                  className={`
                    relative w-12 h-12 md:w-14 md:h-14 rounded-full
                    flex items-center justify-center
                    text-sm font-bold
                    transition-all duration-300
                    ${
                      isBooked
                        ? "bg-white/5 text-white/15 cursor-not-allowed border border-white/5"
                        : isSelected
                        ? "bg-brand-red text-white shadow-lg shadow-brand-red/40 scale-110 ring-4 ring-brand-red/20"
                        : "bg-white/10 text-white/70 border-2 border-white/15 cursor-pointer hover:bg-white/20 hover:border-brand-pink/40 hover:text-white hover:scale-105"
                    }
                  `}
                >
                  {isBooked ? (
                    <svg className="w-4 h-4 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    tableNo
                  )}

                  {/* Selected checkmark */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-3 h-3 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Table label */}
                <span className={`text-[10px] tracking-wide transition-colors ${
                  isBooked ? "text-white/10" : isSelected ? "text-brand-pink font-semibold" : "text-white/30 group-hover:text-white/50"
                }`}>
                  {isBooked ? "Κρατημένο" : `T${tableNo}`}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
