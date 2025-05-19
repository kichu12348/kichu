import { NextResponse } from "next/server";

export function middleware(request) {
    const isAdmin = request.nextUrl.pathname.startsWith("/admin");
    const adminAuth = request.cookies.get("admin-auth");

    if(isAdmin && !adminAuth) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/login";
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/admin/:path*", // Match all paths under /admin
    ]
};