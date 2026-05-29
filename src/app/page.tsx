"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Hero from "@/components/Hero"
import PhotoGallery from "@/components/PhotoGallery"
import AvailabilityBar from "@/components/AvailabilityBar"
import TableMap from "@/components/TableMap"
import BookingForm from "@/components/BookingForm"
import ShareButton from "@/components/ShareButton"
import CommunityWall from "@/components/CommunityWall"

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

      {/* Floating share button */}
      <ShareButton />

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

        <CommunityWall />

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

              {/* Social + Quick info */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">
                <a
                  href="https://instagram.com/valtoterma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-pink transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span>@valtoterma</span>
                </a>
                <span className="text-white/10">|</span>
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
