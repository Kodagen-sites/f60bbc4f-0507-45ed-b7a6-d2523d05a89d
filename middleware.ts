import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

const SESSION_TOKEN = process.env.ADMIN_SESSION_SECRET || "rr-admin-ok";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard the admin area; login + its action stay public.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = req.cookies.get(ADMIN_COOKIE)?.value;
    if (session !== SESSION_TOKEN) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
