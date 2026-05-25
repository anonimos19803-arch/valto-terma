import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { writeFile, mkdir, unlink } from "fs/promises"
import path from "path"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

export async function POST(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    await mkdir(UPLOAD_DIR, { recursive: true })

    const formData = await req.formData()
    const files = formData.getAll("photos") as File[]

    if (!files.length) {
      return NextResponse.json(
        { error: "No files uploaded" },
        { status: 400 }
      )
    }

    const maxOrder = await prisma.photo.aggregate({ _max: { order: true } })
    let nextOrder = (maxOrder._max.order ?? -1) + 1

    const created = []
    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const ext = path.extname(file.name) || ".jpg"
      const filename = `photo_${Date.now()}_${nextOrder}${ext}`
      const filepath = path.join(UPLOAD_DIR, filename)

      await writeFile(filepath, buffer)

      const photo = await prisma.photo.create({
        data: { filename, order: nextOrder },
      })

      created.push(photo)
      nextOrder++
    }

    return NextResponse.json({ photos: created }, { status: 201 })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload photos" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await req.json()
    const photo = await prisma.photo.findUnique({ where: { id: Number(id) } })

    if (photo) {
      try {
        await unlink(path.join(UPLOAD_DIR, photo.filename))
      } catch {
        // file may already be deleted
      }
      await prisma.photo.delete({ where: { id: Number(id) } })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const { photos } = await req.json()

    for (const p of photos as { id: number; order: number }[]) {
      await prisma.photo.update({
        where: { id: p.id },
        data: { order: p.order },
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to reorder photos" },
      { status: 500 }
    )
  }
}
