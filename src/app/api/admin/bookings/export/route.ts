import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    })

    const header = "ID,Όνομα,Τηλέφωνο,Email,Τραπέζι,Άτομα,Σημειώσεις,Ημερομηνία"
    const rows = bookings.map((b) =>
      [
        b.id,
        `"${b.name}"`,
        b.phone,
        b.email || "",
        b.tableNo,
        b.guests,
        `"${(b.notes || "").replace(/"/g, '""')}"`,
        b.createdAt.toISOString(),
      ].join(",")
    )

    const csv = [header, ...rows].join("\n")

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=bookings.csv",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to export" },
      { status: 500 }
    )
  }
}
