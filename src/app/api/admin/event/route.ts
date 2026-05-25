import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function PUT(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const body = await req.json()
    const { title, description, date, time, location, totalTables } = body

    let event = await prisma.event.findFirst()
    if (!event) {
      event = await prisma.event.create({ data: {} })
    }

    const updated = await prisma.event.update({
      where: { id: event.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(date !== undefined && { date }),
        ...(time !== undefined && { time }),
        ...(location !== undefined && { location }),
        ...(totalTables !== undefined && { totalTables: Number(totalTables) }),
      },
    })

    return NextResponse.json({ event: updated })
  } catch {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    )
  }
}
