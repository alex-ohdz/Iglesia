import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Lista de locales disponibles
const locales = ['es','en','po'];

export default getRequestConfig(async ({ locale }) => {
  // Validar que el parámetro `locale` entrante es válido
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default

  };
});
