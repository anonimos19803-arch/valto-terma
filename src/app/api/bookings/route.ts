import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendBookingConfirmation } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, tableNo, guests, notes } = body

    if (!name || !phone || !tableNo || !guests) {
      return NextResponse.json(
        { error: "Συμπλήρωσε τα υποχρεωτικά πεδία" },
        { status: 400 }
      )
    }

    const cleaned = phone.replace(/[\s\-()]/g, "")
    const phoneRegex = /^(\+?357)?9[0-9]{7}$/
    if (!phoneRegex.test(cleaned)) {
      return NextResponse.json(
        { error: "Μη έγκυρος αριθμός τηλεφώνου (π.χ. 9XXXXXXX ή +3579XXXXXXX)" },
        { status: 400 }
      )
    }

    const existing = await prisma.booking.findFirst({
      where: { tableNo: Number(tableNo) },
    })
    if (existing) {
      return NextResponse.json(
        { error: "Αυτό το τραπέζι είναι ήδη κρατημένο" },
        { status: 409 }
      )
    }

    const event = await prisma.event.findFirst()
    if (!event) {
      return NextResponse.json(
        { error: "Δεν βρέθηκε event" },
        { status: 404 }
      )
    }

    const totalBooked = await prisma.booking.count()
    if (totalBooked >= event.totalTables) {
      return NextResponse.json(
        { error: "Δεν υπάρχουν διαθέσιμα τραπέζια" },
        { status: 409 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        phone: cleaned,
        email: email || null,
        tableNo: Number(tableNo),
        guests: Number(guests),
        notes: notes || null,
      },
    })

    if (email) {
      try {
        await sendBookingConfirmation({
          to: email,
          name,
          tableNo: booking.tableNo,
          bookingId: booking.id,
          eventDate: event.date,
          eventTime: event.time,
        })
      } catch (emailError) {
        console.error("Email send failed:", emailError)
      }
    }

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      { error: "Κάτι πήγε στραβά" },
      { status: 500 }
    )
  }
}
