"use client";

import { deleteCommentByCommentId } from "@/lib/api/services";
import { Circle, TrashSimple } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { FunctionComponent, useCallback, useState } from "react";
import { toast } from "react-toastify";

interface DeleteCommentProps {
  commentId: number;
}

const DeleteComment: FunctionComponent<DeleteCommentProps> = ({
  commentId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const deleteHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteCommentByCommentId(commentId);
      toast.success("Success delete comment");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [commentId, router]);
  return (
    <button
      onClick={deleteHandler}
      type="button"
      className="block hover:bg-red-100 "
      title="delete comment"
    >
      {isLoading ? (
        <Circle className="animate-pulse text-red-500" size={18} />
      ) : (
        <TrashSimple size={18} className="text-red-500" />
      )}
    </button>
  );
};

export default DeleteComment;
