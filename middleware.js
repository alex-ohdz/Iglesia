import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

// Crear el middleware de i18n
const i18nMiddleware = createMiddleware({
  locales: ['en', 'es', 'po'],  // Lista de locales soportados: inglés, español, polaco
  defaultLocale: 'es',  // Local por defecto es español
});

// Combinar la autenticación con el middleware de i18n
export async function middleware(req) {
  const url = req.nextUrl.clone();

  // Verificar sesión para todas las rutas /secret/* excepto /secret
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

  // Ejecutar el middleware de i18n después de la autenticación
  return i18nMiddleware(req);
}

export const config = {
  // Definir el matcher que combine ambas configuraciones
  matcher: ['/secret/:path*', '/', '/(en|es|po)/:path*'],
};
