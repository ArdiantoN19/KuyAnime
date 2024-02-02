import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-[80dvh] w-full flex flex-col items-center justify-center gap-5">
      <Image src="/images/404.svg" width={350} height={350} alt="404" />
      <h1 className="font-bold text-3xl text-teal-500">Opps, Page Not Found</h1>
      <Link href={"/"} className="button">
        Back to Home
      </Link>
    </div>
  );
};

export default Page;
