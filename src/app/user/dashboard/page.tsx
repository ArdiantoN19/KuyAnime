import { authServerSession } from "@/lib/api/auth";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

type SessionType = {
  accessToken: string;
  user: {
    image: string;
    name: string;
    email: string;
  };
};

const Page: FunctionComponent = async () => {
  const session = (await authServerSession()) as SessionType;
  return (
    <div className="min-h-[80dvh] w-full flex flex-col items-center justify-center gap-5">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="border shadow rounded w-56 min-h-60 overflow-hidden">
        <Image
          src={session?.user.image as string}
          alt={session?.user.name as string}
          width={250}
          height={250}
          className="w-full h-full object-cover"
        />
        <div className="my-3 text-center">
          <h3 className="font-semibold">{session?.user.name}</h3>
          <small className="text-teal-500">{session?.user.email}</small>
        </div>
      </div>
      <div className="flex items-center gap-x-2 ">
        <Link href={"/user/mycollection"} className="button">
          My Collection
        </Link>
        <Link href={"/user/mycomment"} className="button">
          My Comment
        </Link>
      </div>
    </div>
  );
};

export default Page;
