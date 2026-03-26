import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { token, status } = await req.json();

  const driver = await prisma.drivers.findUnique({
    where: { access_token: token },
  });

  if (!driver) {
    return Response.json({ ok: false }, { status: 404 });
  }

  await prisma.driver_availability.create({
    data: {
      driver_id: driver.id,
      status,
      available_from: "",
      available_to: "",
    },
  });

  return Response.json({ ok: true });
}
