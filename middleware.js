import { NextResponse } from 'next/server';
import { isMobileDevice } from './utils/device';

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

  // Detect if the device is mobile
  const userAgent = req.headers.get('user-agent') || '';
  const isMobile = isMobileDevice(userAgent);

  const response = NextResponse.next();
  response.headers.set('x-is-mobile', isMobile.toString());

  return response;
}

export const config = {
  matcher: '/:path*',
};
