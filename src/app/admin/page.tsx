"use client"

import { useState, useEffect, useCallback, FormEvent, useRef } from "react"

interface Booking {
  id: number
  name: string
  phone: string
  email: string | null
  tableNo: number
  guests: number
  notes: string | null
  createdAt: string
}

interface Stats {
  totalBookings: number
  totalGuests: number
  totalTables: number
  bookedTables: number
}

interface EventData {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  totalTables: number
}

interface Photo {
  id: number
  filename: string
  order: number
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [search, setSearch] = useState("")
  const [event, setEvent] = useState<EventData | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])

  const [activeTab, setActiveTab] = useState<"bookings" | "event" | "photos">("bookings")
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => {
        if (r.ok) setAuthenticated(true)
      })
      .finally(() => setCheckingAuth(false))
  }, [])

  const fetchBookings = useCallback(async () => {
    const params = search ? `?search=${encodeURIComponent(search)}` : ""
    const res = await fetch(`/api/admin/bookings${params}`)
    if (res.ok) {
      const data = await res.json()
      setBookings(data.bookings)
      setStats(data.stats)
    }
  }, [search])

  const fetchEvent = useCallback(async () => {
    const res = await fetch("/api/event")
    if (res.ok) {
      const data = await res.json()
      setEvent(data.event)
      setPhotos(data.photos || [])
    }
  }, [])

  useEffect(() => {
    if (authenticated) {
      fetchBookings()
      fetchEvent()
    }
  }, [authenticated, fetchBookings, fetchEvent])

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoginError("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthenticated(true)
    } else {
      setLoginError("Λάθος κωδικός")
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    setAuthenticated(false)
    setPassword("")
  }

  async function handleDeleteBooking(id: number) {
    const res = await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" })
    if (res.ok) {
      setDeleteId(null)
      fetchBookings()
    }
  }

  async function handleExportCSV() {
    const res = await fetch("/api/admin/bookings/export")
    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "bookings.csv"
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  async function handleSaveEvent(e: FormEvent) {
    e.preventDefault()
    if (!event) return
    setSaving(true)
    await fetch("/api/admin/event", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
    setSaving(false)
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    const formData = new FormData()
    for (const file of Array.from(files)) {
      formData.append("photos", file)
    }
    const res = await fetch("/api/admin/photos", {
      method: "POST",
      body: formData,
    })
    if (res.ok) fetchEvent()
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleDeletePhoto(id: number) {
    const res = await fetch("/api/admin/photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (res.ok) fetchEvent()
  }

  /* ── Loading state ── */
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  /* ── Login screen ── */
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="card p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blue/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="font-heading text-2xl font-bold text-brand-blue">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">ΒάΛτο Τέρμα</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Κωδικός</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                autoFocus
              />
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{loginError}</span>
              </div>
            )}
            <button type="submit" className="btn-primary w-full">
              Είσοδος
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ── Main admin dashboard ── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-xl font-bold text-brand-blue">ΒάΛτο Τέρμα</h1>
            <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-brand-blue/5 text-brand-blue font-semibold border border-brand-blue/10">
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-red transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Αποσύνδεση
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Κρατήσεις",
                value: stats.totalBookings,
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                color: "text-brand-blue",
                bg: "bg-brand-blue/5",
              },
              {
                label: "Άτομα",
                value: stats.totalGuests,
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                label: "Κρατημένα",
                value: `${stats.bookedTables} / ${stats.totalTables}`,
                icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z",
                color: "text-brand-red",
                bg: "bg-red-50",
              },
              {
                label: "Διαθέσιμα",
                value: stats.totalTables - stats.bookedTables,
                icon: "M5 13l4 4L19 7",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
            ].map((stat) => (
              <div key={stat.label} className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <svg className={`w-4 h-4 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                    </svg>
                  </span>
                  <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-gray-100 p-1 w-fit shadow-sm">
          {(["bookings", "event", "photos"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-brand-blue text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab === "bookings" ? "Κρατήσεις" : tab === "event" ? "Event" : "Φωτογραφίες"}
            </button>
          ))}
        </div>

        {/* ── Bookings Tab ── */}
        {activeTab === "bookings" && (
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative max-w-xs w-full">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Αναζήτηση..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10 !py-2.5 text-sm"
                />
              </div>
              <button
                onClick={handleExportCSV}
                className="btn-secondary !py-2.5 text-xs flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {["Όνομα", "Τηλέφωνο", "Email", "Τραπέζι", "Άτομα", "Σημειώσεις", "Ώρα", ""].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-gray-800">{b.name}</td>
                      <td className="px-5 py-4 text-gray-500">{b.phone}</td>
                      <td className="px-5 py-4 text-gray-500">{b.email || "—"}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-red/5 text-brand-red font-bold text-xs">
                          {b.tableNo}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{b.guests}</td>
                      <td className="px-5 py-4 text-gray-400 max-w-[200px] truncate text-xs">{b.notes || "—"}</td>
                      <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(b.createdAt).toLocaleString("el-GR")}
                      </td>
                      <td className="px-5 py-4">
                        {deleteId === b.id ? (
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleDeleteBooking(b.id)} className="text-red-500 text-xs font-semibold hover:underline">
                              Διαγραφή
                            </button>
                            <button onClick={() => setDeleteId(null)} className="text-gray-400 text-xs hover:underline">
                              Ακύρωση
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteId(b.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-50"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-5 py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-8 h-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <p className="text-gray-400 text-sm">Δεν υπάρχουν κρατήσεις</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Event Tab ── */}
        {activeTab === "event" && event && (
          <div className="card p-8 max-w-2xl">
            <h3 className="font-heading text-lg font-bold text-gray-800 mb-6">Ρυθμίσεις Event</h3>
            <form onSubmit={handleSaveEvent} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Τίτλος</label>
                <input type="text" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Περιγραφή</label>
                <textarea value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} rows={3} className="input-field resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Ημερομηνία</label>
                  <input type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Ώρα</label>
                  <input type="time" value={event.time} onChange={(e) => setEvent({ ...event, time: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Τοποθεσία</label>
                <input type="text" value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Σύνολο τραπεζιών</label>
                <input type="number" min={1} max={100} value={event.totalTables} onChange={(e) => setEvent({ ...event, totalTables: Number(e.target.value) })} className="input-field max-w-[120px]" />
              </div>
              <div className="pt-2">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Αποθήκευση...
                    </span>
                  ) : "Αποθήκευση"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Photos Tab ── */}
        {activeTab === "photos" && (
          <div className="card p-8">
            <h3 className="font-heading text-lg font-bold text-gray-800 mb-6">Φωτογραφίες Event</h3>
            <div className="mb-8">
              <label className="block border-2 border-dashed border-gray-200 rounded-xl p-10 text-center cursor-pointer hover:border-brand-blue/30 hover:bg-gray-50/50 transition-all duration-200">
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">Κλικ για upload φωτογραφιών</p>
                <p className="text-xs text-gray-400">JPG, PNG — μέχρι 5MB</p>
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <img src={`/uploads/${photo.filename}`} alt="" className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 text-gray-600 hover:text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            {photos.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">Δεν υπάρχουν φωτογραφίες</p>
                <p className="text-gray-300 text-xs mt-1">Ανέβασε φωτογραφίες για να εμφανιστούν στη σελίδα</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
