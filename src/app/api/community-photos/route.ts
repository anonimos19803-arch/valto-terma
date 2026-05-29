import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

const MAX_SIZE = 2 * 1024 * 1024 // 2MB base64

export async function GET() {
  try {
    const photos = await prisma.communityPhoto.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return NextResponse.json({ photos })
  } catch {
    return NextResponse.json({ photos: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { imageData, name } = await req.json()

    if (!imageData || typeof imageData !== "string") {
      return NextResponse.json({ error: "Λείπει η φωτογραφία" }, { status: 400 })
    }

    if (!imageData.startsWith("data:image/")) {
      return NextResponse.json({ error: "Μη έγκυρη εικόνα" }, { status: 400 })
    }

    if (imageData.length > MAX_SIZE) {
      return NextResponse.json({ error: "Η φωτογραφία είναι πολύ μεγάλη (max 2MB)" }, { status: 400 })
    }

    const photo = await prisma.communityPhoto.create({
      data: {
        imageData,
        name: (name || "").slice(0, 50),
      },
    })

    return NextResponse.json(
      { photo: { id: photo.id, name: photo.name, createdAt: photo.createdAt } },
      { status: 201 }
    )
  } catch (error) {
    console.error("Community photo upload error:", error)
    return NextResponse.json({ error: "Αποτυχία αποθήκευσης" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await req.json()
    await prisma.communityPhoto.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Αποτυχία διαγραφής" }, { status: 500 })
  }
}
