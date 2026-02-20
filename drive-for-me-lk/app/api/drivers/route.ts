import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * =========================================================
 * GET - List Drivers (search + pagination + sorting)
 * =========================================================
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "id";

  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const where: Prisma.driversWhereInput = search
    ? {
        OR: [
          {
            full_name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            phone_primary: {
              contains: search,
            },
          },
          {
            nic: {
              contains: search,
            },
          },
        ],
      }
    : {};

  const [total, data] = await Promise.all([
    prisma.drivers.count({ where }),
    prisma.drivers.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        [sort]: "desc",
      },
      include: {
        driver_availability: {
          take: 1,
          orderBy: {
            available_from: "desc", // latest availability
          },
        },
      },
    }),
  ]);

  const formatted = data.map((d: any) => {
    const availability = d.driver_availability?.[0];

    return {
      id: d.id,
      full_name: d.full_name,
      address: d.address,
      nic: d.nic,
      driver_license: d.driver_license,
      phone_primary: d.phone_primary,
      phone_secondary: d.phone_secondary,
      nationality: d.nationality,
      languages: d.languages,
      status: d.status,
      gender: d.gender,
      created_at: d.created_at,
      updated_at: d.updated_at,

      // ✅ availability fields
      available_from: availability?.available_from || null,
      available_to: availability?.available_to || null,
      availability_status: availability?.status || "unavailable",
    };
  });

  return NextResponse.json({
    ok: true,
    data: formatted,
    totalPages: Math.ceil(total / pageSize),
  });
}

/**
 * =========================================================
 * POST - Create Driver
 * =========================================================
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      full_name,
      address,
      nic,
      driver_license,
      phone_primary,
      phone_secondary,
      nationality,
      languages,
      status,
      gender,
    } = body;

    // ✅ Basic validation
    if (!full_name || !nic || !driver_license || !phone_primary) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Full name, NIC, driver license, and primary phone are required",
        },
        { status: 400 },
      );
    }

    // ✅ Create driver
    const newDriver = await prisma.drivers.create({
      data: {
        full_name,
        address,
        nic,
        driver_license,
        phone_primary,
        phone_secondary,
        nationality,
        languages,
        status: status || "active",
        gender,
      },
    });

    return NextResponse.json({
      ok: true,
      data: newDriver,
    });
  } catch (error: any) {
    console.error("CREATE DRIVER ERROR:", error);

    // ✅ Handle unique constraint errors nicely
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            ok: false,
            error: "Driver with same NIC or License already exists",
          },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to create driver",
      },
      { status: 500 },
    );
  }
}
