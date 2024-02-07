"use client";

import { SignOut, User } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FunctionComponent } from "react";

const Auth: FunctionComponent = () => {
  return (
    <ul className="flex flex-col">
      <Link
        className="text-sm py-1.5 px-3 flex items-center hover:bg-slate-100 gap-x-2"
        href={"/user/dashboard"}
      >
        <User size={16} /> Dashboard
      </Link>
      <hr />
      <button
        type="button"
        className="text-sm py-1.5 px-3 hover:bg-slate-100 flex items-center gap-x-2"
        onClick={() => signOut()}
      >
        <SignOut size={16} /> Logout
      </button>
    </ul>
  );
};

export default Auth;
