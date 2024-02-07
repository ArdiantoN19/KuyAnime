import { ResponseCommentType } from "@/types/comment";
import ItemComment from "./ItemComment";
import React, { FunctionComponent } from "react";

interface ListCommentProps {
  comments: ResponseCommentType[];
}

const ListComment: FunctionComponent<ListCommentProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment: ResponseCommentType, index: number) => (
        <div key={comment.id}>
          <ItemComment
            comment={comment}
            index={index}
            commentLength={comments.length}
          />
        </div>
      ))}
    </div>
  );
};

export default ListComment;
