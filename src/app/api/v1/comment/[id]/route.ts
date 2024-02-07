import {
  deleteCommentByCommentId,
  getCommentsByAnimeMalId,
} from "@/lib/prisma/services";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const anime_mal_id = Number(params.id);
  const { statusCode, status, data, message } = await getCommentsByAnimeMalId(
    anime_mal_id
  );
  return Response.json({ status, data, message }, { status: statusCode });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const commentId = Number(params.id);
  const { statusCode, status, data, message } = await deleteCommentByCommentId(
    commentId
  );
  return Response.json({ status, data, message }, { status: statusCode });
}
