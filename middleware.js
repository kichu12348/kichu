import { NextResponse } from "next/server";

const endpoint = process.env.NEXT_PUBLIC_BASE_URL;

export async function middleware(request) {
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");
  const adminAuth = request.cookies.get("admin-auth");
  if (isAdmin && !adminAuth) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  try {
    const resposne = await fetch(
      `${endpoint}/api/auth/is-valid/${adminAuth.trim()}`
    );

    const data = await resposne.json();
    if (resposne.status !== 200 || !data.valid) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
    if (data.valid) return NextResponse.next();
  } catch (e) {
    console.log("Error in middleware", e);
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // Match all paths under /admin
  ],
};
