import { NextResponse } from "next/server";
import { auth } from "./auth/auth";

type NextAuthRequest = {
  headers: Headers;
  url: string;
  auth?: unknown;
  nextUrl: URL;
};

const isAuthRoute = (url: string) =>
  url.includes("/login") || url.includes("/register");

const isProtectedRoute = (url: string) =>
  !isAuthRoute(url) && url.includes("/");

const handleAuthRedirects = (request: NextAuthRequest) => {
  const isAuthenticated = Boolean(request.auth);
  const isHtmlRequest =
    request.headers.get("accept")?.includes("text/html") ?? false;

  if (!isHtmlRequest) {
    return null; // برای API یا JSON درخواست‌ها ریدایرکت نکن
  }

  if (isAuthenticated && isAuthRoute(request.url)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthenticated && isProtectedRoute(request.url)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
};

export default auth(
  (request) => handleAuthRedirects(request) || NextResponse.next()
);

export const config = {
  matcher: [
    "/((?!api/auth|api/login|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
