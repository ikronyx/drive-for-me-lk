import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Fetch all drivers whose availability status is "available"
    const availableDrivers = await prisma.driver_availability.findMany({
      where: { status: "available" },
      include: { drivers: true }, // join to get driver info
    });

    // Map to id + name
    const drivers = availableDrivers.map((d: any) => ({
      id: d.driver_id,
      name: d.drivers.full_name, // make sure your driver model has a 'name' field
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
