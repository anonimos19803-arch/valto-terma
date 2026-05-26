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
      <div className="min-h-screen flex items-center justify-center bg-pink-bg">
        <div className="w-8 h-8 border-3 border-cherry border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!event || !tableData) {
    return <div className="min-h-screen flex items-center justify-center bg-pink-bg text-royal/50">Δεν βρέθηκε event</div>
  }

  return (
    <main className="min-h-screen bg-pink-50">
      <Hero title={event.title} description={event.description} date={event.date} time={event.time} location={event.location} />
      <PhotoGallery photos={photos} />
      <AvailabilityBar total={tableData.totalTables} booked={tableData.bookedTables.length} />
      <TableMap totalTables={tableData.totalTables} bookedTables={tableData.bookedTables} selectedTable={selectedTable} onSelectTable={setSelectedTable} />
      <BookingForm selectedTable={selectedTable} isFull={tableData.available <= 0} onSuccess={() => { setSelectedTable(null); fetchData() }} />

      <footer className="py-10 text-center border-t border-pink-200">
        <p className="font-heading text-lg font-bold text-royal">ΒάΛτο Τέρμα</p>
        <p className="text-xs text-royal/30 mt-1">Made with love</p>
      </footer>
    </main>
  )
}
