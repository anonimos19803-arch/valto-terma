"use client"

import { useState, FormEvent } from "react"

interface BookingFormProps {
  selectedTable: number | null
  isFull: boolean
  onSuccess: () => void
}

export default function BookingForm({ selectedTable, isFull, onSuccess }: BookingFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [guests, setGuests] = useState("2")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  if (isFull) {
    return (
      <section className="max-w-lg mx-auto px-6 py-16 text-center" id="booking">
        <div className="card p-10">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-gray-800 mb-2">Sold Out</h3>
          <p className="text-sm text-gray-400">Όλα τα τραπέζια έχουν κρατηθεί.</p>
        </div>
      </section>
    )
  }

  if (success) {
    return (
      <section className="max-w-lg mx-auto px-6 py-16 text-center" id="booking">
        <div className="card p-10 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Η κράτησή σου επιβεβαιώθηκε</h3>
          <p className="text-gray-400 mb-1">Θα σε δούμε εκεί!</p>
          {email && <p className="text-xs text-gray-400">Email επιβεβαίωσης στο {email}</p>}
        </div>
      </section>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    if (!selectedTable) { setError("Επίλεξε ένα τραπέζι πρώτα"); return }
    setLoading(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email: email || undefined, tableNo: selectedTable, guests: Number(guests), notes: notes || undefined }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Κάτι πήγε στραβά"); return }
      setSuccess(true)
      onSuccess()
    } catch { setError("Αποτυχία σύνδεσης. Δοκίμασε ξανά.") }
    finally { setLoading(false) }
  }

  return (
    <section className="max-w-lg mx-auto px-6 py-12" id="booking">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-blue mb-2">
          Στοιχεία Κράτησης
        </h2>
        {selectedTable ? (
          <p className="text-sm text-gray-400">
            Τραπέζι <span className="font-semibold text-brand-red">#{selectedTable}</span>
          </p>
        ) : (
          <p className="text-sm text-amber-500">
            ↑ Επίλεξε τραπέζι πρώτα
          </p>
        )}
      </div>

      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Ονοματεπώνυμο *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="π.χ. Μαρία Ιωάννου" className="input-field" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Τηλέφωνο *</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="69[0-9]{8}" placeholder="69xxxxxxxx" className="input-field" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Email <span className="text-gray-300 normal-case">(προαιρετικό)</span></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="input-field" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Αριθμός ατόμων *</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)} required className="input-field">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "άτομο" : "άτομα"}</option>
              ))}
              <option value="9">8+ άτομα</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Σημειώσεις <span className="text-gray-300 normal-case">(προαιρετικό)</span></label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="π.χ. γενέθλια, αλλεργίες..." className="input-field resize-none" />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-lg">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button type="submit" disabled={loading || !selectedTable} className="btn-primary w-full">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Αποστολή...
                </span>
              ) : "Ολοκλήρωση Κράτησης"}
            </button>
          </div>

          <p className="text-[11px] text-gray-300 text-center pt-1">
            Με την κράτηση αποδέχεσαι ότι τα στοιχεία σου χρησιμοποιούνται μόνο για τη διαχείριση του event.
          </p>
        </form>
      </div>
    </section>
  )
}
