import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const event = await prisma.event.findFirst()
    const totalTables = event?.totalTables ?? 25

    const bookings = await prisma.booking.findMany({
      select: { tableNo: true },
    })

    const bookedTables = bookings.map((b) => b.tableNo)

    return NextResponse.json({
      totalTables,
      bookedTables,
      available: totalTables - bookedTables.length,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tables" },
      { status: 500 }
    )
  }
}
