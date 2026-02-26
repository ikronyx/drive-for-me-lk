import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE BOOKING
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.bookings.create({
      data: {
        customer_name: body.name,
        phone: body.phone,
        pickup_location: body.pickup_location,
        dropoff_location: body.dropoff_location,
        arrival_time: body.arrival_time ? new Date(body.arrival_time) : null,
        vehicle_reg_no: body.vehicle_reg_no || null,
        status: "pending",
        payment_status: "unpaid",
      },
    });

    return NextResponse.json({ ok: true, booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

// GET BOOKINGS (pagination + search + sort)
export async function GET() {
  try {
    const bookings = await prisma.bookings.findMany({
      orderBy: { id: "desc" }, // newest first
    });

    return NextResponse.json({ ok: true, bookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
