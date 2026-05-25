import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""

    const bookings = await prisma.booking.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { phone: { contains: search } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
    })

    const event = await prisma.event.findFirst()
    const totalGuests = bookings.reduce((sum, b) => sum + b.guests, 0)

    return NextResponse.json({
      bookings,
      stats: {
        totalBookings: bookings.length,
        totalGuests,
        totalTables: event?.totalTables ?? 25,
        bookedTables: bookings.length,
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
