import { authServerSession } from "@/lib/api/auth";
import { getCollections, postCollection } from "@/lib/prisma/services";
import { payloadCollectionType } from "@/types/collection";

export async function POST(request: Request) {
  const session = await authServerSession();

  if (!session?.accessToken) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 }
    );
  }
  const { mal_id, anime_image, anime_title } = await request.json();
  const payload: payloadCollectionType = {
    anime_mal_id: mal_id,
    owner_id: session?.user.userId,
    anime_image,
    anime_title,
  };
  const { statusCode, status, data, message } = await postCollection(payload);
  return Response.json({ status, data, message }, { status: statusCode });
}

export async function GET() {
  const { statusCode, status, data, message } = await getCollections();
  return Response.json({ status, data, message }, { status: statusCode });
}
