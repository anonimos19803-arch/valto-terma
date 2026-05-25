"use client"

import { useState, useEffect, useCallback } from "react"
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

interface Photo {
  id: number
  filename: string
}

interface TableData {
  totalTables: number
  bookedTables: number[]
  available: number
}

export default function HomePage() {
  const [event, setEvent] = useState<EventData | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [tableData, setTableData] = useState<TableData | null>(null)
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [eventRes, tableRes] = await Promise.all([
        fetch("/api/event"),
        fetch("/api/tables"),
      ])
      const eventData = await eventRes.json()
      const tablesData = await tableRes.json()

      setEvent(eventData.event)
      setPhotos(eventData.photos || [])
      setTableData(tablesData)
    } catch (err) {
      console.error("Failed to load data:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  function handleBookingSuccess() {
    setSelectedTable(null)
    fetchData()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted">Loading...</span>
        </div>
      </div>
    )
  }

  if (!event || !tableData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-muted">
        Δεν βρέθηκε event
      </div>
    )
  }

  const isFull = tableData.available <= 0

  return (
    <main className="min-h-screen bg-dark">
      <Hero
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        location={event.location}
      />

      <PhotoGallery photos={photos} />

      <AvailabilityBar
        total={tableData.totalTables}
        booked={tableData.bookedTables.length}
      />

      <TableMap
        totalTables={tableData.totalTables}
        bookedTables={tableData.bookedTables}
        selectedTable={selectedTable}
        onSelectTable={setSelectedTable}
      />

      <BookingForm
        selectedTable={selectedTable}
        isFull={isFull}
        onSuccess={handleBookingSuccess}
      />

      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-sm text-gradient font-heading font-bold tracking-wide">ΒάΛτο Τέρμα</p>
        <p className="text-xs text-muted mt-2">Made with love</p>
      </footer>
    </main>
  )
}
