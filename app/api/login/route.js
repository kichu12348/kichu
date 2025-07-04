import { NextResponse } from "next/server";

const endpoint = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request) {
  try {
    const { password } = await request.json();
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (password !== envPassword) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 401 }
      );
    }
    const res = await fetch(`${endpoint}/api/user-token`);
    const data = await res.json();
    const response = NextResponse.json(
      { message: "Login successful", success: true,
        token: data.token  
       },
      { status: 200 }
    );

    if (res.status !== 200 || !data.token || !res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch user token", success: false },
        { status: 500 }
      );
    }

    response.cookies.set({
      name: "admin-auth",
      value: data.token,
      path: "/", //
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true, //
      secure: true, // only send cookie over HTTPS
      sameSite: "none", // cross-site cookies
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
