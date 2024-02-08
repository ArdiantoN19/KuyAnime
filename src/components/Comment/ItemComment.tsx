"use client";

import { ResponseCommentApiType } from "@/types/comment";
import Image from "next/image";
import React, { FunctionComponent, useState } from "react";
import { postedAt } from "@/utils";
import { ThumbsDown } from "@phosphor-icons/react/dist/ssr";
import DeleteComment from "./DeleteComment";
import UpVoteComment from "./UpVoteComment";
import {
  downVoteCommentByCommentId,
  neutralVoteCommentByCommentId,
  upVoteCommentByCommentId,
} from "@/lib/api/services";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DownVoteComment from "./DownVoteComment";

interface ItemCommentProps {
  comment: ResponseCommentApiType;
  index: number;
  commentLength: number;
  upVoteBy: boolean;
  downVoteBy: boolean;
}

const ItemComment: FunctionComponent<ItemCommentProps> = ({
  comment,
  index,
  commentLength,
  upVoteBy,
  downVoteBy,
}) => {
  const { data: session } = useSession();
  const [isUpVote, setIsUpVote] = useState<boolean>(upVoteBy);
  const [isDownVote, setIsDownVote] = useState<boolean>(downVoteBy);
  const router = useRouter();

  const upVoteHandler = async () => {
    if (isUpVote && !isDownVote) {
      try {
        await neutralVoteCommentByCommentId(comment.id);
        setIsUpVote(false);
        toast.success("Success neutral-vote comment");
      } catch (error: any) {
        toast.error(error.message);
        setIsUpVote(true);
      } finally {
        router.refresh();
      }
    } else {
      try {
        await upVoteCommentByCommentId(comment.id);
        setIsUpVote(true);
        setIsDownVote(false);
        toast.success("Success up-vote comment");
      } catch (error: any) {
        toast.error(error.message);
        setIsUpVote(false);
      } finally {
        router.refresh();
      }
    }
  };

  const downVoteHandler = async () => {
    if (isDownVote && !isUpVote) {
      try {
        await neutralVoteCommentByCommentId(comment.id);
        setIsDownVote(false);
        toast.success("Success neutral-vote comment");
      } catch (error: any) {
        toast.error(error.message);
        setIsDownVote(true);
      } finally {
        router.refresh();
      }
    } else {
      try {
        await downVoteCommentByCommentId(comment.id);
        setIsDownVote(true);
        setIsUpVote(false);
        toast.success("Success down-vote comment");
      } catch (error: any) {
        toast.error(error.message);
        setIsDownVote(false);
      } finally {
        router.refresh();
      }
    }
  };

  return (
    <>
      <div className="w-full flex items-center gap-x-4 mb-5 group/comment">
        <Image
          src={comment.owner.image}
          width={60}
          height={60}
          className="w-12 h-12 rounded-full object-cover"
          alt={comment.owner.name}
        />
        <div className="w-full">
          <div className="w-full flex items-center justify-between mb-1 relative ">
            <div className="flex items-center gap-x-2">
              <h4 className="font-semibold">{comment.owner.name}</h4>
              <p className="text-xs text-slate-400">
                {postedAt(comment.created_at)}
              </p>
            </div>
            {session?.user.userId === comment.owner_id ? (
              <div className="hidden group-hover/comment:block absolute top-0 right-5">
                <DeleteComment commentId={comment.id} />
              </div>
            ) : null}
          </div>
          <p className="mb-2 text-sm">{comment.comment}</p>
          <div className="text-slate-400 flex items-center gap-x-3 text-xs">
            <button className="font-semibold">Reply</button>
            <span className="font-semibold">
              {comment.upVoteBy.length} Likes
            </span>
            <UpVoteComment isUpVote={isUpVote} upVoteHandler={upVoteHandler} />
            <DownVoteComment
              isDownVote={isDownVote}
              downVoteHandler={downVoteHandler}
            />
          </div>
        </div>
      </div>
      {index < commentLength - 1 && <hr className="w-full mb-5" />}
    </>
  );
};

export default ItemComment;
