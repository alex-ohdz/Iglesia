import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // Check session for all /secret/* routes except /secret itself
  if (url.pathname.startsWith('/secret/') && url.pathname !== '/secret') {
    const cookie = req.headers.get('cookie');
    const res = await fetch(`${url.origin}/api/session`, {
      headers: {
        cookie: cookie || '',
      },
    });

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const session = await res.json();

      if (!session.user) {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    } else {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/secret/:path*',
};
