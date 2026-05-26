"use client"

import { useEffect, useRef } from "react"

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
  const prevSelected = useRef<number | null>(null)

  // Auto-scroll to booking form when a table is selected
  useEffect(() => {
    if (selectedTable && selectedTable !== prevSelected.current) {
      prevSelected.current = selectedTable
      setTimeout(() => {
        const el = document.getElementById("booking")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 300)
    }
  }, [selectedTable])

  return (
    <section className="max-w-3xl mx-auto px-6 py-8" id="tables">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center">1</span>
          <span className="text-sm font-medium text-white">Τραπέζι</span>
        </div>
        <div className="w-8 h-px bg-white/20" />
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${selectedTable ? "bg-brand-red text-white" : "bg-white/10 text-white/30"}`}>2</span>
          <span className={`text-sm font-medium transition-colors ${selectedTable ? "text-white" : "text-white/30"}`}>Στοιχεία</span>
        </div>
        <div className="w-8 h-px bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-white/10 text-white/30 text-xs font-bold flex items-center justify-center">3</span>
          <span className="text-sm font-medium text-white/30">Έτοιμο</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Διάλεξε Τραπέζι
        </h2>
        <p className="text-sm text-white/40">
          Πάτα πάνω σε ένα διαθέσιμο τραπέζι για να το κρατήσεις
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mb-6 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full border-2 border-white/20 bg-white/5" />
          <span>Διαθέσιμο</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-brand-red shadow-lg shadow-brand-red/30" />
          <span>Επιλεγμένο</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-white/5 border border-white/5" />
          <span>Κρατημένο</span>
        </div>
      </div>

      {/* Floor plan */}
      <div className="card p-5 md:p-8">
        {/* Stage / DJ area */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-red/15 border border-brand-red/25 rounded-full px-5 py-2">
            <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
            </svg>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-red">Stage / DJ</span>
          </div>
        </div>

        {/* Tables grid — 4 cols on mobile for bigger touch targets, 5 on desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4 max-w-lg mx-auto">
          {tables.map((tableNo) => {
            const isBooked = bookedTables.includes(tableNo)
            const isSelected = selectedTable === tableNo

            return (
              <button
                key={tableNo}
                disabled={isBooked}
                onClick={() => onSelectTable(tableNo)}
                aria-label={`Τραπέζι ${tableNo}${isBooked ? " - Κρατημένο" : isSelected ? " - Επιλεγμένο" : " - Διαθέσιμο"}`}
                className="flex flex-col items-center gap-1 group"
              >
                {/* Table circle */}
                <div
                  className={`
                    relative w-14 h-14 md:w-16 md:h-16 rounded-full
                    flex items-center justify-center
                    text-sm font-bold
                    transition-all duration-300
                    ${
                      isBooked
                        ? "bg-white/5 text-white/15 cursor-not-allowed border border-white/5"
                        : isSelected
                        ? "bg-brand-red text-white shadow-lg shadow-brand-red/40 scale-110 ring-4 ring-brand-red/20"
                        : "bg-white/10 text-white/70 border-2 border-white/15 cursor-pointer hover:bg-white/20 hover:border-brand-pink/40 hover:text-white hover:scale-105 active:scale-95"
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

        {/* Selected table notification */}
        {selectedTable && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-2 text-sm">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-white/70">Τραπέζι</span>
              <span className="font-bold text-brand-pink">#{selectedTable}</span>
              <span className="text-white/40">|</span>
              <span className="text-white/50 text-xs">Συνέχισε παρακάτω</span>
              <svg className="w-3 h-3 text-white/40 animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
