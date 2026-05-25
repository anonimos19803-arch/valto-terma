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
    <section className="px-6 py-12 max-w-3xl mx-auto" id="tables">
      <h2 className="section-title text-center mb-2">Χάρτης Τραπεζιών</h2>
      <p className="text-center text-sm text-gray-400 mb-8">
        Επίλεξε το τραπέζι σου
      </p>
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
                border text-sm font-medium transition-all duration-200
                ${
                  isBooked
                    ? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "bg-primary border-primary text-white scale-105 shadow-lg"
                    : "bg-white border-gray-200 text-primary hover:border-primary hover:shadow-sm"
                }
              `}
            >
              <span className="text-xs text-gray-400 mb-0.5">
                {isBooked ? "" : "#"}
              </span>
              <span className={`text-lg font-semibold ${isBooked ? "text-gray-300" : ""}`}>
                {tableNo}
              </span>
              {isBooked && (
                <span className="text-[10px] text-gray-300 mt-0.5">
                  Κρατημένο
                </span>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
