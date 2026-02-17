import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const assignments = await prisma.booking_driver_assignment.findMany({
      include: { bookings: true, drivers: true },
      orderBy: { assigned_at: "desc" },
    });

    return NextResponse.json({ ok: true, assignments });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
