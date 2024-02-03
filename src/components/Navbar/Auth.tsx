"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FunctionComponent } from "react";

const Auth: FunctionComponent = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.accessToken ? (
        <div className="flex gap-x-3 items-center">
          <Link
            href={"/user/dashboard"}
            className="px-2 py-1.5 rounded border text-white border-white"
          >
            Dashboard
          </Link>
          <button
            className="px-2 py-1.5 rounded border text-white border-white"
            onClick={() => signOut()}
          >
            signOut
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="px-3 py-2 rounded bg-white text-teal-400 drop-shadow-sm transition-all active:scale-95"
        >
          signIn
        </button>
      )}
    </div>
  );
};

export default Auth;
