import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // Check for the token when accessing /secret
  if (url.pathname === '/secret') {
    const secretToken = url.searchParams.get('token');
    const expectedToken = process.env.NEXT_PUBLIC_SECRET_TOKEN;

    if (!secretToken || secretToken !== expectedToken) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  } else {
    // For all other /secret/* routes, check the session
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
  matcher: ['/secret', '/secret/:path*'],
};
