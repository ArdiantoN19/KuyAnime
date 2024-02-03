"use client";
import { ArrowLeft, GithubLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, Suspense } from "react";

const Page: FunctionComponent = () => {
  const router = useRouter();
  const params = useSearchParams();

  const handleBack = () => {
    router.back();
  };

  const handleSignIn = async () => {
    await signIn("github", {
      redirect: false,
      callbackUrl: params.get("callbackUrl") as string,
    });
  };

  return (
    <Suspense>
      <div className="min-h-screen w-full grid place-items-center">
        <div className="absolute top-10 left-10">
          <button
            onClick={handleBack}
            className="button flex items-center gap-x-1"
            type="button"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
        <div className="max-w-md border shadow p-5 relative">
          <Image
            src="/images/cute-chicken.svg"
            alt="cute-chicken"
            width={100}
            height={100}
            className="absolute -top-14 left-1/2 -translate-x-1/2"
          />
          <button
            className="p-3 rounded text-white bg-black flex items-center gap-2 active:scale-95 transition-all mx-auto mt-10"
            onClick={handleSignIn}
            type="button"
          >
            <GithubLogo
              size={28}
              className="bg-white text-black rounded-full p-1"
            />
            Continue with GitHub
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
