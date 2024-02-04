import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await prisma.user.findMany();
  return Response.json({ status: true, data: user });
}
