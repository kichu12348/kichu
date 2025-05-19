import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (password !== envPassword) {
      return NextResponse.json(
        { message: 'Invalid password' }, 
        { status: 401 }
      );
    }

    // Create the response
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'admin-auth',
      value: 'true',
      path: '/',
      maxAge: 60 * 60 * 24*7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
