"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FunctionComponent, Suspense } from "react";

const Auth: FunctionComponent = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    const url = `/login?${params.toString()}`;
    router.push(url);
  };

  const handleSignIn = () => {
    const encodePathname = encodeURI(pathname);
    queryString("callbackUrl", encodePathname);
  };

  return (
    <Suspense>
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
            onClick={handleSignIn}
            className="px-3 py-2 rounded bg-white text-teal-400 drop-shadow-sm transition-all active:scale-95"
          >
            signIn
          </button>
        )}
      </div>
    </Suspense>
  );
};

export default Auth;
