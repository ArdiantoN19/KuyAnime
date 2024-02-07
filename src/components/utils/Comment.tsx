"use client";

import { getComments } from "@/lib/api/services";
import { ResponseCommentType } from "@/types/comment";
import React, { FunctionComponent, useEffect, useState } from "react";
import ItemComment from "../Comment/ItemComment";
import DataNotFound from "../DataNotFound";
import Link from "next/link";
import Image from "next/image";
import { postedAt } from "@/utils";

const Comment: FunctionComponent = () => {
  const [comments, setComments] = useState<ResponseCommentType[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getComments();
      setComments(res);
    })();
  }, []);

  if (!comments.length) {
    return <DataNotFound />;
  }

  return (
    <div className="my-10">
      {comments.map((comment: ResponseCommentType, index: number) => (
        <Link href={`/anime/${comment.anime_mal_id}`} key={comment.id}>
          <div className="w-full flex items-center gap-x-4 mb-5">
            <Image
              src={comment.owner.image}
              width={60}
              height={60}
              className="w-12 h-12 rounded-full object-cover"
              alt={comment.owner.name}
            />
            <div>
              <div className="flex items-center gap-x-2 mb-1">
                <h4 className="font-semibold">{comment.owner.name}</h4>
                <p className="text-xs text-slate-400">
                  {postedAt(comment.created_at)}
                </p>
              </div>
              <p className="mb-2 text-sm">{comment.comment}</p>
            </div>
          </div>
          {index < comments.length - 1 && <hr className="w-full mb-5" />}
        </Link>
      ))}
    </div>
  );
};

export default Comment;
