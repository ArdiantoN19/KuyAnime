import { ResponseCommentApiType } from "@/types/comment";
import ItemComment from "./ItemComment";
import React, { FunctionComponent } from "react";
import { authServerSession } from "@/lib/api/auth";

interface ListCommentProps {
  comments: ResponseCommentApiType[];
}

const ListComment: FunctionComponent<ListCommentProps> = async ({
  comments,
}) => {
  const session = await authServerSession();

  return (
    <div>
      {comments.map((comment: ResponseCommentApiType, index: number) => (
        <div key={comment.id}>
          <ItemComment
            comment={comment}
            index={index}
            upVoteBy={comment.upVoteBy.includes(session?.user.userId)}
            downVoteBy={comment.downVoteBy.includes(session?.user.userId)}
            commentLength={comments.length}
          />
        </div>
      ))}
    </div>
  );
};

export default ListComment;
