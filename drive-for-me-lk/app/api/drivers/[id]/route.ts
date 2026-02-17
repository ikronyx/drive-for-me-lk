import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const driverId = Number(id);

    if (!driverId) {
      return NextResponse.json(
        { ok: false, error: "Invalid driver id" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const driver = await prisma.drivers.update({
      where: { id: driverId },
      data: body,
    });

    return NextResponse.json({ ok: true, driver });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message || "Update failed" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const driverId = Number(id);

    if (!driverId) {
      return NextResponse.json(
        { ok: false, error: "Invalid driver id" },
        { status: 400 },
      );
    }

    await prisma.drivers.delete({
      where: { id: driverId },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err.message || "Delete failed" },
      { status: 500 },
    );
  }
}
