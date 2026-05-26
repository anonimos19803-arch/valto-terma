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
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">Sold Out</h3>
          <p className="text-sm text-white/40">Όλα τα τραπέζια έχουν κρατηθεί.</p>
        </div>
      </section>
    )
  }

  if (success) {
    return (
      <section className="max-w-lg mx-auto px-6 py-16 text-center" id="booking">
        <div className="card p-10 animate-fade-in">
          {/* Celebration */}
          <div className="text-4xl mb-4">🎉</div>
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl font-bold text-white mb-3">Η κράτησή σου επιβεβαιώθηκε!</h3>
          <p className="text-white/50 mb-4">Θα σε δούμε εκεί!</p>

          <div className="bg-white/5 rounded-xl px-5 py-4 border border-white/10 mb-4">
            <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Λεπτομέρειες κράτησης</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-white/60">Όνομα: <span className="text-white font-medium">{name}</span></span>
              <span className="text-white/20">|</span>
              <span className="text-white/60">Τραπέζι: <span className="text-brand-pink font-bold">#{selectedTable}</span></span>
              <span className="text-white/20">|</span>
              <span className="text-white/60">Άτομα: <span className="text-white font-medium">{guests}</span></span>
            </div>
          </div>

          {email && <p className="text-xs text-white/30">Email επιβεβαίωσης στο <span className="text-brand-pink">{email}</span></p>}
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
    <section className="max-w-lg mx-auto px-6 py-10" id="booking">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Στοιχεία Κράτησης
        </h2>
        {selectedTable ? (
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-white/60">Τραπέζι</span>
            <span className="font-bold text-brand-pink">#{selectedTable}</span>
          </div>
        ) : (
          <p className="text-sm text-amber-400/80 flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
            </svg>
            Επίλεξε τραπέζι πρώτα
          </p>
        )}
      </div>

      <div className="card p-6 md:p-8">
        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 mb-5 pb-5 border-b border-white/5">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <span className="text-xs text-white/40 tracking-wide">Ασφαλής κράτηση — Τα στοιχεία σου είναι προστατευμένα</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">Ονοματεπώνυμο *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="π.χ. Μαρία Ιωάννου" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">Τηλέφωνο *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+357 9XXXXXXX" className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">Email <span className="text-white/20 normal-case">(προαιρετικό)</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">Άτομα *</label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)} required className="input-field">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-gray-900 text-white">{n} {n === 1 ? "άτομο" : "άτομα"}</option>
                ))}
                <option value="9" className="bg-gray-900 text-white">8+ άτομα</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">Σημειώσεις <span className="text-white/20 normal-case">(προαιρετικό)</span></label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="π.χ. γενέθλια, αλλεργίες..." className="input-field resize-none" />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button type="submit" disabled={loading || !selectedTable} className="btn-primary w-full py-4 text-base">
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

          <p className="text-[11px] text-white/20 text-center pt-1 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Τα στοιχεία σου χρησιμοποιούνται μόνο για τη διαχείριση του event.
          </p>
        </form>
      </div>
    </section>
  )
}
