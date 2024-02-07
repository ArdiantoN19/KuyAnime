import React, { FunctionComponent } from "react";
import { ChatCentered } from "@phosphor-icons/react/dist/ssr";
import AddComment from "./AddComment";
import { getCommentsByAnimeMalId } from "@/lib/api/services";
import ListComment from "./ListComment";
import { authServerSession } from "@/lib/api/auth";

export const dynamic = "force-dynamic";

interface CommentProps {
  anime_mal_id: number;
}

const Comment: FunctionComponent<CommentProps> = async ({ anime_mal_id }) => {
  const session = await authServerSession();
  const comments = await getCommentsByAnimeMalId(anime_mal_id);

  return (
    <div className="container mb-16">
      <div className="w-full mb-5">
        <h3 className="font-bold text-xl mb-1">
          The Comments <span>({!comments.length ? 0 : comments.length})</span>
        </h3>
        <p className="text-sm text-slate-500">
          Start a comment, not a fire. Post with kindness
        </p>
        {!session && (
          <p className="text-xs font-bold text-slate-500 mt-2">
            Login first to add comment
          </p>
        )}
      </div>
      <hr className="w-full border border-slate-300 mb-5" />
      <div className="text-sm text-slate-500 mb-5">
        <label htmlFor="sorting">Sort by </label>
        <select
          name="sorting"
          id="sorting"
          className="border-none outline-none font-semibold bg-transparent"
          defaultValue={"newest"}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {session?.user && <AddComment anime_mal_id={anime_mal_id} />}
      {!comments.length ? (
        <div className="w-full min-h-40 grid place-items-center">
          <div className="">
            <ChatCentered size={60} className="text-teal-400 mx-auto" />
            <h2 className="text-2xl font-bold">Oops, Comment Not Found</h2>
          </div>
        </div>
      ) : (
        <ListComment comments={comments} />
      )}
    </div>
  );
};

export default Comment;
