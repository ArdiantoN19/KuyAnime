import { ResponseCommentType } from "@/types/comment";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { postedAt } from "@/utils";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react/dist/ssr";
import DeleteComment from "./DeleteComment";
import { authServerSession } from "@/lib/api/auth";

interface ItemCommentProps {
  comment: ResponseCommentType;
  index: number;
  commentLength: number;
}

const ItemComment: FunctionComponent<ItemCommentProps> = async ({
  comment,
  index,
  commentLength,
}) => {
  const session = await authServerSession();
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
            <span className="font-semibold">12 Likes</span>
            <button className="">
              <ThumbsUp size={16} />
            </button>
            <button className="">
              <ThumbsDown size={16} />
            </button>
          </div>
        </div>
      </div>
      {index < commentLength - 1 && <hr className="w-full mb-5" />}
    </>
  );
};

export default ItemComment;
