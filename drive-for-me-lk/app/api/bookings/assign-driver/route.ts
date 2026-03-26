import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

function generateToken() {
  return randomBytes(16).toString("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { booking_id, driver_id } = await req.json();
    if (!booking_id || !driver_id)
      return NextResponse.json(
        { ok: false, error: "Missing booking_id or driver_id" },
        { status: 400 },
      );

    const booking = await prisma.bookings.findUnique({
      where: { id: Number(booking_id) },
    });
    if (!booking)
      return NextResponse.json(
        { ok: false, error: "Booking not found" },
        { status: 404 },
      );
    if (booking.status !== "pending")
      return NextResponse.json(
        { ok: false, error: "Booking is not pending" },
        { status: 400 },
      );

    const availability = await prisma.driver_availability.findFirst({
      where: {
        driver_id: Number(driver_id),
        status: {
          not: "unavailable",
        },
      },
    });
    if (!availability)
      return NextResponse.json(
        { ok: false, error: "Driver not available" },
        { status: 400 },
      );

    // 1. ensure driver has token
    const driver = await prisma.drivers.findUnique({
      where: { id: driver_id },
    });
    let token = driver?.access_token;

    if (!token) {
      token = generateToken();

      await prisma.drivers.update({
        where: { id: driver_id },
        data: { access_token: token },
      });
    }
    // Create assignment
    await prisma.booking_driver_assignment.create({
      data: {
        booking_id: Number(booking_id),
        driver_id: Number(driver_id),
        status: "driver_assigned",
      },
    });

    // Update driver availability
    await prisma.driver_availability.update({
      where: { id: availability.id },
      data: { status: "on_hire" },
    });

    // Update booking status
    await prisma.bookings.update({
      where: { id: Number(booking_id) },
      data: { status: "driver_assigned" },
    });

    return NextResponse.json({
      ok: true,
      driver_access_link: `/driver/assignments/${token}`,
      driver_phone: driver?.phone_primary,
      driver_name: driver?.full_name,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
