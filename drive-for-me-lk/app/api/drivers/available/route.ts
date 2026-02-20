import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ---------------- GET ---------------- */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const driver_id = searchParams.get("driver_id");

    // 👉 get single driver availability
    if (driver_id) {
      const availability = await prisma.driver_availability.findFirst({
        where: { driver_id: Number(driver_id) },
        orderBy: { created_at: "desc" },
      });

      return NextResponse.json({ ok: true, data: availability });
    }

    // 👉 default list of available drivers
    const availableDrivers = await prisma.driver_availability.findMany({
      where: { status: "available" },
      include: { drivers: true },
    });

    const drivers = availableDrivers.map((d: any) => ({
      availability_id: d.id,
      driver_id: d.driver_id,
      name: d.drivers.full_name,
    }));

    return NextResponse.json({ ok: true, drivers });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

/* ---------------- POST (CREATE) ---------------- */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { driver_id, available_from, available_to, status } = body;

    if (!driver_id || !available_from || !available_to) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const created = await prisma.driver_availability.create({
      data: {
        driver_id: Number(driver_id),
        available_from: new Date(available_from),
        available_to: new Date(available_to),
        status: status || "available",
      },
    });

    return NextResponse.json({ ok: true, data: created });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Create failed" },
      { status: 500 },
    );
  }
}

/* ---------------- PUT (UPDATE) ---------------- */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, available_from, available_to, status } = body;

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "ID required" },
        { status: 400 },
      );
    }

    const updated = await prisma.driver_availability.update({
      where: { id: Number(id) },
      data: {
        available_from: new Date(available_from),
        available_to: new Date(available_to),
        status: status || "available",
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Update failed" },
      { status: 500 },
    );
  }
}
