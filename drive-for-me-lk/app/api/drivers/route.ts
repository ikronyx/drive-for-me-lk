import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "id";
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const where = search
    ? {
        OR: [
          { full_name: { contains: search, mode: "insensitive" } },
          { phone_primary: { contains: search } },
          { nic: { contains: search } },
        ],
      }
    : {};

  const [total, data] = await Promise.all([
    prisma.drivers.count({ where }),
    prisma.drivers.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { [sort]: "desc" },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    data,
    totalPages: Math.ceil(total / pageSize),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const driver = await prisma.drivers.create({ data: body });
    return NextResponse.json({ ok: true, driver });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
