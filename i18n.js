// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa tus archivos de traducción
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import poTranslation from './locales/po/translation.json';

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador del usuario
  .use(initReactI18next) // Pasa i18n al módulo de react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
      po: {
        translation: poTranslation,
      },
    },
    fallbackLng: 'es', // Idioma por defecto en caso de que la detección falle
    debug: true, // Desactívalo en producción
    interpolation: {
      escapeValue: false, // React ya se encarga de escapar por defecto
    },
  });

export default i18n;
