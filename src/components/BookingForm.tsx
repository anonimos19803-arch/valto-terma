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
        <div className="bg-surface p-10">
          <h2 className="section-title mb-4">Sold Out</h2>
          <p className="text-gray-500">
            Δυστυχώς όλα τα τραπέζια έχουν κρατηθεί.
          </p>
        </div>
      </section>
    )
  }

  if (success) {
    return (
      <section className="px-6 py-16 max-w-xl mx-auto text-center" id="booking">
        <div className="bg-surface p-10 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="section-title mb-4">Η κράτηση ολοκληρώθηκε!</h2>
          <p className="text-gray-500">
            Θα σε δούμε εκεί. {email && "Έχεις email επιβεβαίωσης."}
          </p>
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
          name,
          phone,
          email: email || undefined,
          tableNo: selectedTable,
          guests: Number(guests),
          notes: notes || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Κάτι πήγε στραβά")
        return
      }

      setSuccess(true)
      onSuccess()
    } catch {
      setError("Αποτυχία σύνδεσης. Δοκίμασε ξανά.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-6 py-16 max-w-xl mx-auto" id="booking">
      <h2 className="section-title text-center mb-2">Κράτηση</h2>
      <p className="text-center text-sm text-gray-400 mb-8">
        {selectedTable
          ? `Τραπέζι #${selectedTable} επιλεγμένο`
          : "Επίλεξε πρώτα ένα τραπέζι"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Όνομα *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Τηλέφωνο (69xxxxxxxx) *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="69[0-9]{8}"
            className="input-field"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email (προαιρετικό)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
            className="input-field"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "άτομο" : "άτομα"}
              </option>
            ))}
            <option value="9">8+ άτομα</option>
          </select>
        </div>
        <div>
          <textarea
            placeholder="Σημειώσεις (π.χ. birthday, αλλεργίες)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !selectedTable}
          className="btn-primary w-full text-sm tracking-widest uppercase"
        >
          {loading ? "Αποστολή..." : "Ολοκλήρωση Κράτησης"}
        </button>
      </form>
    </section>
  )
}
