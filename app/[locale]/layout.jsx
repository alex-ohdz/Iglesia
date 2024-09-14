import { Inter } from "next/font/google";
import "@styles/globals.css";
import "@fontsource/roboto";
import Head from "next/head";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Iglesia - Página de Ejemplo",
  description: "Descripción específica de la página.",
};

export default async function RootLayout({ children, params }) {
  const { locale } = params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.googleapis.com; img-src 'self' data:; connect-src 'self' https://api.example.com;"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <html lang={locale} className={inter.className}>
        <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
