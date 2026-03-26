import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    // ============================
    // 🚗 DRIVER MODE (token exists)
    // ============================
    if (token) {
      const driver = await prisma.drivers.findUnique({
        where: { access_token: token },
        include: {
          booking_driver_assignment: {
            include: {
              bookings: true,
            },
            orderBy: { assigned_at: "desc" },
          },
          driver_availability: {
            orderBy: { created_at: "desc" },
            take: 1,
          },
        },
      });

      if (!driver) {
        return NextResponse.json(
          { ok: false, error: "Invalid token" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        ok: true,
        mode: "driver",
        driver: {
          id: driver.id,
          name: driver.full_name,
          phone: driver.phone_primary,
          availability: driver.driver_availability[0]?.status ?? "available",
          current_booking: driver.driver_availability[0].current_booking ?? -1,
        },
        assignments: driver.booking_driver_assignment.map((a) => ({
          id: a.id,
          status: a.status,
          assigned_at: a.assigned_at,
          booking: a.bookings,
        })),
      });
    }

    // ============================
    // 🧑‍💼 ADMIN MODE (no token)
    // ============================
    const assignments = await prisma.booking_driver_assignment.findMany({
      include: {
        bookings: true,
        drivers: true,
      },
      orderBy: { assigned_at: "desc" },
    });

    return NextResponse.json({
      ok: true,
      mode: "admin",
      assignments,
    });
  } catch (err) {
    console.error("ASSIGNMENTS API ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
