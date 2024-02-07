"use client";

import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { addComment } from "@/lib/api/services";
import { useRouter } from "next/navigation";

interface AddCommentProps {
  anime_mal_id: number;
}

const AddComment: FunctionComponent<AddCommentProps> = ({ anime_mal_id }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const commentChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };

  const submitHandler = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        if (comment.length > 3) {
          await addComment({ anime_mal_id, comment });
          toast.success("Success add comment");
          router.refresh();
        } else {
          false;
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
        setComment("");
      }
    },
    [anime_mal_id, comment, router]
  );
  return (
    <>
      <form className="w-full mb-5" onSubmit={submitHandler}>
        <div className="w-full flex items-center gap-x-4 mb-2">
          <label htmlFor="comment" className="w-12 h-12 block">
            <Image
              src={session?.user.image}
              width={60}
              height={60}
              className="w-12 h-12 rounded-full object-cover"
              alt="avatar"
            />
          </label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={commentChangeHandler}
            placeholder="Add a comment..."
            className="p-4 text-sm border border-slate-300 focus:border-teal-400 group/input w-5/6 md:w-[calc(100%-4rem)] rounded bg-transparent outline-none"
          />
        </div>
        <button
          className="button block ms-auto group-focus/input:mx-auto"
          type="submit"
          disabled={comment.length < 3 || isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AddComment;
