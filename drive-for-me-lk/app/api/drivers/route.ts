import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "id";

  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  // ✅ Correct Prisma typed filter
  const where: Prisma.driversWhereInput = search
    ? {
        OR: [
          {
            full_name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive, // ✅ FIX
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
    }),
  ]);

  return NextResponse.json({
    ok: true,
    data,
    totalPages: Math.ceil(total / pageSize),
  });
}
