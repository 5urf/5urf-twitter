import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';

const publicOnlyUrls = new Set(['/log-in', '/create-account']);

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;
  const isPublic = publicOnlyUrls.has(pathname);
  const isLoggedIn = Boolean(session.id);
  const isRootPage = pathname === '/';

  if (!isLoggedIn && isRootPage) {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
