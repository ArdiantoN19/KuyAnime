"use client";

import React, { FunctionComponent, Suspense, useRef } from "react";
import Image from "next/image";
import Auth from "./Auth";
import { signIn, useSession } from "next-auth/react";
import Dropdown from "../Dropdown";

const ProfileMenu: FunctionComponent = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        type="button"
        id="signIn"
        onClick={() => signIn()}
        className="px-3 py-2 rounded bg-white text-teal-400 drop-shadow-sm transition-all active:scale-95"
      >
        LogIn
      </button>
    );
  }
  return (
    <Dropdown
      target="profile"
      label={
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <Image
            src="https://avatars.githubusercontent.com/u/99185119?v=4"
            width={60}
            height={60}
            className="w-full h-full object-cover"
            alt="avatar"
          />
        </div>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Auth />
      </Suspense>
    </Dropdown>
  );
};

export default ProfileMenu;
