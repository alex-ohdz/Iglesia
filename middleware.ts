import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_ACCESS_COOKIE_NAME } from "./src/shared/constants/admin";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/secret/") && url.pathname !== "/secret") {
    const adminAccessCookie = req.cookies.get(ADMIN_ACCESS_COOKIE_NAME);

    if (!adminAccessCookie || !adminAccessCookie.value) {
      url.pathname = "/secret";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/secret/:path*",
};
