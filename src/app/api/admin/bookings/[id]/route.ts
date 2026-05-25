import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const id = parseInt(params.id)
    await prisma.booking.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    )
  }
}
