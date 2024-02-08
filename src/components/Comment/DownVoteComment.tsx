"use client";

import { ThumbsDown } from "@phosphor-icons/react";
import React, { FunctionComponent } from "react";

interface DownVoteCommentProps {
  isDownVote: boolean;
  downVoteHandler: () => void;
}

const DownVoteComment: FunctionComponent<DownVoteCommentProps> = ({
  isDownVote,
  downVoteHandler,
}) => {
  return (
    <button
      className={isDownVote ? "text-teal-500" : "text-slate-400"}
      onClick={downVoteHandler}
      title="downvote comment"
    >
      <ThumbsDown size={16} weight={isDownVote ? "fill" : "regular"} />
    </button>
  );
};

export default DownVoteComment;
