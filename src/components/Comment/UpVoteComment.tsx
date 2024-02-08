"use client";

import { ThumbsUp } from "@phosphor-icons/react";
import React, { FunctionComponent } from "react";

interface UpVoteCommentProps {
  upVoteHandler: () => void;
  isUpVote: boolean;
}

const UpVoteComment: FunctionComponent<UpVoteCommentProps> = ({
  upVoteHandler,
  isUpVote,
}) => {
  return (
    <button
      className={isUpVote ? "text-teal-500" : "text-slate-400"}
      onClick={upVoteHandler}
      title="upvote comment"
    >
      <ThumbsUp size={16} weight={isUpVote ? "fill" : "regular"} />
    </button>
  );
};

export default UpVoteComment;
