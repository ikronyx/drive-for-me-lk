import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    console.group("token is here: ", token)

    const driver = await prisma.drivers.findUnique({
      where: { access_token: token },
      include: {
        driver_availability: {
          take: 1,
          orderBy: { created_at: "desc" }, // safer than available_from
        },
      },
    });

    if (!driver) {
      return NextResponse.json(
        { ok: false, error: "Driver not found" },
        { status: 404 }
      );
    }

    const availability = driver.driver_availability?.[0];

    const now = new Date();

    const isAvailableNow =
      availability &&
      availability.status === "available" &&
      (!availability.available_from || now >= availability.available_from) &&
      (!availability.available_to || now <= availability.available_to);

    return NextResponse.json({
      ok: true,
      driver: {
        id: driver.id,
        full_name: driver.full_name,
        status: driver.status,

        availability_id: availability?.id || null,
        availability_status: availability?.status || "available",
        current_booking: availability?.current_booking ?? -1,

        available_from: availability?.available_from,
        available_to: availability?.available_to,

        is_available_now: isAvailableNow,
      },
    });
  } catch (error) {
    console.error("GET DRIVER ME ERROR:", error);

    return NextResponse.json(
      { ok: false, error: "Failed to fetch driver" },
      { status: 500 }
    );
  }
}