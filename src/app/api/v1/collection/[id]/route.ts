import { authServerSession } from "@/lib/api/auth";
import {
  getCollectionByEmailandMalId,
  deleteCollection,
} from "@/lib/prisma/services";
import {
  DetailCollectionType,
  payloadCollectionType,
} from "@/types/collection";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await authServerSession();
  if (!session?.accessToken) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 }
    );
  }
  const payload: DetailCollectionType = {
    anime_mal_id: Number(params.id),
    owner_id: session?.user.userId,
  };

  const { statusCode, status, data, message } =
    await getCollectionByEmailandMalId(payload);
  return Response.json({ status, data, message }, { status: statusCode });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await authServerSession();

  if (!session?.accessToken) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const mal_id = Number(params.id);
  const payload: DetailCollectionType = {
    anime_mal_id: mal_id,
    owner_id: session?.user.userId,
  };
  const { statusCode, status, data, message } = await deleteCollection(payload);
  return Response.json({ status, data, message }, { status: statusCode });
}
