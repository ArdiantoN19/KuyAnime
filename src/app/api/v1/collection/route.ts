import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  return Response.json({ status: true, data: [] });
}
