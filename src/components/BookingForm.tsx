"use client"

import { useState, FormEvent } from "react"

interface BookingFormProps {
  selectedTable: number | null
  isFull: boolean
  onSuccess: () => void
}

export default function BookingForm({
  selectedTable,
  isFull,
  onSuccess,
}: BookingFormProps) {
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
      <section className="px-6 py-16 max-w-xl mx-auto text-center" id="booking">
        <div className="glass-card p-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cherry/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-cherry" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="section-title mb-4">Sold Out</h2>
          <p className="text-royal/50">Δυστυχώς όλα τα τραπέζια έχουν κρατηθεί.</p>
        </div>
      </section>
    )
  }

  if (success) {
    return (
      <section className="px-6 py-16 max-w-xl mx-auto text-center" id="booking">
        <div className="glass-card p-12 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="section-title mb-4">Τέλεια!</h2>
          <p className="text-royal/60 text-lg">
            Η κράτησή σου ολοκληρώθηκε. Θα σε δούμε εκεί!
          </p>
          {email && (
            <p className="text-sm text-royal/40 mt-3">Θα λάβεις email επιβεβαίωσης.</p>
          )}
        </div>
      </section>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    if (!selectedTable) {
      setError("Επίλεξε ένα τραπέζι από τον χάρτη παραπάνω")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email: email || undefined,
          tableNo: selectedTable, guests: Number(guests),
          notes: notes || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Κάτι πήγε στραβά"); return }
      setSuccess(true)
      onSuccess()
    } catch { setError("Αποτυχία σύνδεσης. Δοκίμασε ξανά.") }
    finally { setLoading(false) }
  }

  return (
    <section className="px-6 py-16 max-w-xl mx-auto" id="booking">
      <div className="text-center mb-10">
        <h2 className="section-title mb-3">Κάνε Κράτηση</h2>
        <p className="text-sm text-royal/50">
          {selectedTable ? (
            <>Τραπέζι <span className="text-cherry font-bold">#{selectedTable}</span> επιλεγμένο</>
          ) : (
            "Επίλεξε πρώτα ένα τραπέζι"
          )}
        </p>
      </div>

      <div className="glass-card p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Όνομα *" value={name} onChange={(e) => setName(e.target.value)} required className="input-field" />
          <input type="tel" placeholder="Τηλέφωνο (69xxxxxxxx) *" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="69[0-9]{8}" className="input-field" />
          <input type="email" placeholder="Email (προαιρετικό)" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
          <select value={guests} onChange={(e) => setGuests(e.target.value)} required className="input-field">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "άτομο" : "άτομα"}</option>
            ))}
            <option value="9">8+ άτομα</option>
          </select>
          <textarea placeholder="Σημειώσεις (π.χ. birthday, αλλεργίες)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="input-field resize-none" />

          {error && (
            <div className="flex items-center gap-2 text-cherry text-sm bg-cherry/5 px-4 py-2.5 rounded-xl border border-cherry/20">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading || !selectedTable} className="btn-primary w-full text-sm tracking-widest uppercase">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Αποστολή...
              </span>
            ) : "Ολοκλήρωση Κράτησης"}
          </button>
        </form>
      </div>
    </section>
  )
}
