import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    let event = await prisma.event.findFirst()
    if (!event) {
      event = await prisma.event.create({ data: {} })
    }

    const photos = await prisma.photo.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json({ event, photos })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    )
  }
}
