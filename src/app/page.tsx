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
        <footer className="py-10 text-center border-t border-white/10">
          <p className="text-sm text-white/60 font-medium">
            Βάλ' το Τέρμα <span className="text-white/20 mx-1">|</span> <span className="text-brand-pink">powered by Greek vibes</span> 🇬🇷
          </p>
          <p className="text-[11px] text-white/20 mt-2 tracking-wide">
            © {new Date().getFullYear()} — All rights reserved
          </p>
        </footer>
      </div>
    </main>
  )
}
