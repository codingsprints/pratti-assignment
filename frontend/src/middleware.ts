// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that don't require authentication
const publicRoutes = ["/auth/login", "/register"];
const dashboardPath = "/dashboard";
const landingPage = "/";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // If the request is for static files, API routes, or favicon, let it pass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }
  // if (leandingPage.includes(pathname) && !token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  if (publicRoutes.includes(pathname) && token) {
    // If user is accessing a public page but is already authenticated, redirect to dashboard
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  // If user is accessing a protected page but not authenticated, redirect to login
  // if (pathname === "/register" && !token) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  if (!publicRoutes.includes(pathname) && !token) {
    if (pathname === "/login")
      return NextResponse.redirect(new URL("/auth/login", request.url));
    return NextResponse.redirect(new URL("/register", request.url));
  }

  // Otherwise, let the request proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
