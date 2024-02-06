"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { FunctionComponent, useCallback } from "react";

interface HeaderProps {
  title: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={handleBack}
        className="button flex items-center gap-x-1"
        type="button"
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <h1 className="text-xl md:text-2xl font-bold mb-2 text-teal-400 drop-shadow-sm">
        {title}
      </h1>
    </div>
  );
};

export default Header;
