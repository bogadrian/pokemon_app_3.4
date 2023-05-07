import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
const tokenSecret = '123456';
export function middleware(request: NextRequest) {
  let token = request.cookies.get('token')?.value;

  const isTokenValid = token === tokenSecret;

  if (!isTokenValid && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  if (isTokenValid && request.nextUrl.pathname.startsWith('/auth')) {
    console.log('token valid');
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
