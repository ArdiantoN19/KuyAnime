import { authServerSession } from "@/lib/api/auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export const withAuth = (middleware: NextMiddleware, requireAuth: string[]) => {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const { pathname } = req.nextUrl;
    const token = await getToken({
      req,
      secret: process.env.NEXT_AUTH_SECRET,
    });

    if (pathname.startsWith("/login") && token) {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }

    if (requireAuth.includes(pathname) && !token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    return middleware(req, next);
  };
};
