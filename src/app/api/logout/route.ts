import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = NextResponse.json({ message: 'ok' }, { status: 200 });

  response.cookies.set({
    name: 'token',
    value: '',
    //  httpOnly: true,
    maxAge: 60 * 60
  });

  return response;
}
