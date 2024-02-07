import { authServerSession } from "@/lib/api/auth";
import { addComment, getComments } from "@/lib/prisma/services";
import { PayloadCommentType } from "@/types/comment";

export async function POST(request: Request) {
  const session = await authServerSession();

  if (!session?.accessToken) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 }
    );
  }
  const { anime_mal_id, comment } = await request.json();
  const payload: PayloadCommentType = {
    anime_mal_id,
    comment,
    owner_id: session.user.userId,
  };
  const { statusCode, status, data, message } = await addComment(payload);
  return Response.json({ status, data, message }, { status: statusCode });
}

export async function GET(request: Request) {
  const session = await authServerSession();
  if (!session?.accessToken) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { statusCode, status, data, message } = await getComments(
    session.user.userId
  );
  return Response.json({ status, data, message }, { status: statusCode });
}
