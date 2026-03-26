import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { driver_id, status, current_booking } = body;

    if (!driver_id) {
      return NextResponse.json(
        { ok: false, error: "Missing driver_id" },
        { status: 400 },
      );
    }

    // Find the latest availability for this driver
    const latestAvailability = await prisma.driver_availability.findFirst({
      where: { driver_id },
      orderBy: { created_at: "desc" },
    });

    if (!latestAvailability) {
      return NextResponse.json(
        { ok: false, error: "Driver availability not found" },
        { status: 404 },
      );
    }

    // Update the current availability
    const updated = await prisma.driver_availability.update({
      where: { id: latestAvailability.id },
      data: {
        status,
        current_booking,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ ok: true, updated });
  } catch (err) {
    console.error("UPDATE DRIVER AVAILABILITY ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Update failed" },
      { status: 500 },
    );
  }
}
