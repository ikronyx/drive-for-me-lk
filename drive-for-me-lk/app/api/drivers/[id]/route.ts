import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  try {
    const driver = await prisma.drivers.update({
      where: { id: parseInt(params.id) },
      data: body,
    });
    return NextResponse.json({ ok: true, driver });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.drivers.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
