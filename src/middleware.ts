import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "./utils/withAuth";

// export default function middleware(req: NextRequest) {
// const sessionTokenCookie = req.cookies.get("next-auth.session-token");
// const { pathname } = req.nextUrl;
// if (pathname.startsWith("/user") && !sessionTokenCookie) {
// const url = req.nextUrl.clone();
// url.pathname = "/login";
// url.search = `?callbackUrl=${encodeURI(pathname)}`;
//   const url = new URL("/login", req.url);
//   url.searchParams.set("callbackUrl", encodeURI(pathname));
//   return NextResponse.redirect(url);
// }

// if (pathname.startsWith("/login") && sessionTokenCookie) {
//   const url = new URL("/", req.url);
//   return NextResponse.redirect(url);
// }
//   console.log("object", req.cookies.getAll());
//   return NextResponse.next();
// }

// export const config = { matcher: ["/user/:path*"] };

const mainMiddleware = (req: NextRequest) => {
  return NextResponse.next();
};

export default withAuth(mainMiddleware, ["/user/dashboard", "/api"]);
