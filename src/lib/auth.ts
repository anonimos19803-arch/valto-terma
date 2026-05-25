import { NextRequest, NextResponse } from "next/server"

export function requireAdmin(req: NextRequest): NextResponse | null {
  const session = req.cookies.get("admin_session")
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return null
}
