import { authServerSession } from "@/lib/api/auth";
import { downVoteCommentByUserIdAndCommentId } from "@/lib/prisma/services";
import { PayloadCommentLikeType } from "@/types/commentLike";

export async function POST(
  request: Request,
  { params }: { params: { animeMalId: string } }
) {
  const session = await authServerSession();
  if (!session?.accessToken) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 }
    );
  }

  const payload: PayloadCommentLikeType = {
    comment_id: Number(params.animeMalId),
    owner_id: session.user.userId,
  };

  const { statusCode, status, data, message } =
    await downVoteCommentByUserIdAndCommentId(payload);
  return Response.json({ status, data, message }, { status: statusCode });
}
