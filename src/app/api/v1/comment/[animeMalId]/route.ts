import {
  deleteCommentByCommentId,
  getCommentsByAnimeMalId,
  getDownVoteComment,
  getUpVoteComment,
} from "@/lib/prisma/services";

export async function GET(
  request: Request,
  { params }: { params: { animeMalId: string } }
) {
  const anime_mal_id = Number(params.animeMalId);
  const { statusCode, status, data, message } = await getCommentsByAnimeMalId(
    anime_mal_id
  );
  const upVotesBy = await getUpVoteComment();
  const downVotesBy = await getDownVoteComment();
  if (Array.isArray(data)) {
    const result = data.map((comment) => ({
      ...comment,
      upVoteBy: upVotesBy.data
        .filter((upVote) => upVote.comment_id === comment.id)
        .map(({ owner_id }) => owner_id),
      downVoteBy: downVotesBy.data
        .filter((downVote) => downVote.comment_id === comment.id)
        .map(({ owner_id }) => owner_id),
    }));
    return Response.json({ status, data: result }, { status: statusCode });
  }
  return Response.json({ status, data, message }, { status: statusCode });
}

export async function DELETE(
  request: Request,
  { params }: { params: { animeMalId: string } }
) {
  const commentId = Number(params.animeMalId);
  const { statusCode, status, data, message } = await deleteCommentByCommentId(
    commentId
  );
  return Response.json({ status, data, message }, { status: statusCode });
}
