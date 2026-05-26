"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Hero from "@/components/Hero"
import PhotoGallery from "@/components/PhotoGallery"
import AvailabilityBar from "@/components/AvailabilityBar"
import TableMap from "@/components/TableMap"
import BookingForm from "@/components/BookingForm"

interface EventData {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  totalTables: number
}

interface Photo { id: number; filename: string }
interface TableData { totalTables: number; bookedTables: number[]; available: number }

export default function HomePage() {
  const [event, setEvent] = useState<EventData | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [tableData, setTableData] = useState<TableData | null>(null)
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [eventRes, tableRes] = await Promise.all([fetch("/api/event"), fetch("/api/tables")])
      const eventData = await eventRes.json()
      const tablesData = await tableRes.json()
      setEvent(eventData.event)
      setPhotos(eventData.photos || [])
      setTableData(tablesData)
    } catch (err) { console.error("Failed to load data:", err) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-white/40 tracking-wide">Φόρτωση...</p>
        </div>
      </div>
    )
  }

  if (!event || !tableData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 mb-1">Δεν βρέθηκε event</p>
          <p className="text-xs text-white/30">Παρακαλώ δοκιμάστε ξανά αργότερα</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen relative">
      {/* Fixed ocean background for entire site */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-brand-blue/60 to-black/70" />
      </div>

      {/* All content floats above the background */}
      <div className="relative z-10">
        <Hero
          title={event.title}
          description={event.description}
          date={event.date}
          time={event.time}
          location={event.location}
        />
        <PhotoGallery photos={photos} />
        <AvailabilityBar total={tableData.totalTables} booked={tableData.bookedTables.length} />
        <TableMap
          totalTables={tableData.totalTables}
          bookedTables={tableData.bookedTables}
          selectedTable={selectedTable}
          onSelectTable={setSelectedTable}
        />
        <BookingForm
          selectedTable={selectedTable}
          isFull={tableData.available <= 0}
          onSuccess={() => { setSelectedTable(null); fetchData() }}
        />

        {/* Footer */}
        <footer className="mt-8 border-t border-white/10">
          <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Top section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-white/5">
              {/* Brand */}
              <div className="text-center md:text-left">
                <p className="font-heading text-xl font-bold text-white mb-1">Βάλ' το Τέρμα</p>
                <p className="text-sm text-brand-pink">Greek vibes only 🇬🇷</p>
              </div>

              {/* Quick info */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                <span className="text-white/10">|</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span>{event.date}</span>
                </div>
              </div>
            </div>

            {/* Trust elements */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs text-white/30">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span>Ασφαλής κράτηση</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>Προστασία δεδομένων</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Άμεση επιβεβαίωση</span>
              </div>
            </div>

            {/* Bottom */}
            <div className="text-center">
              <p className="text-sm text-white/40 font-medium mb-2">
                Βάλ' το Τέρμα <span className="text-white/15 mx-1">|</span> <span className="text-brand-pink/70">powered by Greek vibes</span> 🇬🇷
              </p>
              <p className="text-[11px] text-white/15 tracking-wide">
                © {new Date().getFullYear()} — All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
