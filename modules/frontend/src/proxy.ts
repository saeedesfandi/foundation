import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

export default async function proxy(req) {
  const { pathname, nextUrl } = req.nextUrl;

  // 1. i18n: پیش‌فرض fa برای root (بدون چک اتوماتیک)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fa', req.url));
  }

  // 2. Auth: چک لاگین برای /panel
  const session = await auth();
  const isLoggedIn = !!session;
  
  if (pathname === "/panel/login") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/panel", req.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && pathname.startsWith("/panel")) {
    return NextResponse.redirect(new URL("/panel/login", req.url));
  }

  // اگر هیچی، ادامه بده
  return NextResponse.next();
}
