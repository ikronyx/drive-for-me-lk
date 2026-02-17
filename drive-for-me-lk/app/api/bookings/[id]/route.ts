import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params; //
    const id = Number(params.id);

    const body = await req.json();

    const updated = await prisma.bookings.update({
      where: { id },
      data: {
        customer_name: body.customer_name,
        phone: body.phone,
        pickup_location: body.pickup_location,
        dropoff_location: body.dropoff_location || null,
        arrival_time: body.arrival_time ? new Date(body.arrival_time) : null,
        landmark: body.landmark || null,
        vehicle_reg_no: body.vehicle_reg_no || null,
        notes: body.notes || null,
        distance_km: body.distance_km || null,
        estimated_fare: body.estimated_fare || null,
        payment_status: body.payment_status || "unpaid",
        status: body.status || "pending",
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ ok: true, booking: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Update failed" },
      { status: 500 },
    );
  }
}
