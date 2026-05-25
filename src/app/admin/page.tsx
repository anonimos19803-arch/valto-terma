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

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="glass-card p-10 w-full max-w-sm relative z-10">
          <h1 className="font-heading text-2xl font-bold text-center mb-2 text-gradient">Admin</h1>
          <p className="text-center text-muted text-sm mb-8">ΒάΛτο Τέρμα</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Κωδικός"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              autoFocus
            />
            {loginError && (
              <p className="text-red-400 text-sm text-center">{loginError}</p>
            )}
            <button type="submit" className="btn-primary w-full text-sm tracking-widest uppercase">
              Είσοδος
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-xl font-bold text-gradient">ΒάΛτο Τέρμα</h1>
            <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">Admin</span>
          </div>
          <button onClick={handleLogout} className="text-sm text-muted hover:text-white transition-colors">
            Αποσύνδεση
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Κρατήσεις", value: stats.totalBookings, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "text-accent" },
              { label: "Άτομα", value: stats.totalGuests, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "text-gold" },
              { label: "Κρατημένα", value: `${stats.bookedTables} / ${stats.totalTables}`, icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z", color: "text-pink-400" },
              { label: "Διαθέσιμα", value: stats.totalTables - stats.bookedTables, icon: "M5 13l4 4L19 7", color: "text-emerald-400" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <svg className={`w-4 h-4 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                  <p className="text-xs text-muted tracking-wide uppercase">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 glass-card p-1 w-fit">
          {(["bookings", "event", "photos"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                activeTab === tab
                  ? "bg-accent text-white shadow-glow"
                  : "text-muted hover:text-white"
              }`}
            >
              {tab === "bookings" ? "Κρατήσεις" : tab === "event" ? "Event" : "Φωτογραφίες"}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <input
                type="text"
                placeholder="Αναζήτηση..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field max-w-xs"
              />
              <button onClick={handleExportCSV} className="btn-outline text-sm">
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Όνομα", "Τηλέφωνο", "Email", "Τραπέζι", "Άτομα", "Σημειώσεις", "Ώρα", ""].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs text-muted font-medium tracking-wide uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">{b.name}</td>
                      <td className="px-6 py-4 text-muted">{b.phone}</td>
                      <td className="px-6 py-4 text-muted">{b.email || "—"}</td>
                      <td className="px-6 py-4"><span className="text-accent font-semibold">#{b.tableNo}</span></td>
                      <td className="px-6 py-4">{b.guests}</td>
                      <td className="px-6 py-4 text-muted max-w-[200px] truncate">{b.notes || "—"}</td>
                      <td className="px-6 py-4 text-muted text-xs">
                        {new Date(b.createdAt).toLocaleString("el-GR")}
                      </td>
                      <td className="px-6 py-4">
                        {deleteId === b.id ? (
                          <div className="flex gap-2">
                            <button onClick={() => handleDeleteBooking(b.id)} className="text-red-400 text-xs font-medium hover:underline">Ναι</button>
                            <button onClick={() => setDeleteId(null)} className="text-muted text-xs hover:underline">Όχι</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteId(b.id)} className="text-muted hover:text-red-400 transition-colors">
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
                      <td colSpan={8} className="px-6 py-12 text-center text-muted">Δεν υπάρχουν κρατήσεις</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Event Tab */}
        {activeTab === "event" && event && (
          <div className="glass-card p-8 max-w-2xl">
            <form onSubmit={handleSaveEvent} className="space-y-5">
              <div>
                <label className="block text-xs text-muted tracking-wide uppercase mb-2">Τίτλος</label>
                <input type="text" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs text-muted tracking-wide uppercase mb-2">Περιγραφή</label>
                <textarea value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} rows={3} className="input-field resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted tracking-wide uppercase mb-2">Ημερομηνία</label>
                  <input type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs text-muted tracking-wide uppercase mb-2">Ώρα</label>
                  <input type="time" value={event.time} onChange={(e) => setEvent({ ...event, time: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted tracking-wide uppercase mb-2">Τοποθεσία</label>
                <input type="text" value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-xs text-muted tracking-wide uppercase mb-2">Σύνολο τραπεζιών</label>
                <input type="number" min={1} max={100} value={event.totalTables} onChange={(e) => setEvent({ ...event, totalTables: Number(e.target.value) })} className="input-field max-w-[120px]" />
              </div>
              <button type="submit" disabled={saving} className="btn-primary text-sm tracking-widest uppercase">
                {saving ? "Αποθήκευση..." : "Αποθήκευση"}
              </button>
            </form>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === "photos" && (
          <div className="glass-card p-8">
            <div className="mb-8">
              <label className="block border-2 border-dashed border-white/10 rounded-2xl p-10 text-center cursor-pointer hover:border-accent/30 transition-colors">
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <svg className="w-10 h-10 mx-auto text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-muted">Drag & drop ή κλικ για upload</p>
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group rounded-xl overflow-hidden">
                  <img src={`/uploads/${photo.filename}`} alt="" className="w-full aspect-square object-cover" />
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-dark/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            {photos.length === 0 && (
              <p className="text-center text-muted text-sm py-8">Δεν υπάρχουν φωτογραφίες</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
