import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "../../public/locales/en/translation.json";
import esTranslation from "../../public/locales/es/translation.json";

const resources: Resource = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
};

const isBrowser = typeof window !== "undefined";

if (!i18n.isInitialized) {
  if (isBrowser) {
    i18n.use(LanguageDetector);
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "es",
      supportedLngs: ["es", "en"],
      defaultNS: "translation",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      ...(isBrowser
        ? {
            detection: {
              order: ["querystring", "localStorage", "navigator", "htmlTag"],
              caches: ["localStorage"],
            },
          }
        : {}),
      debug: process.env.NEXT_PUBLIC_I18N_DEBUG === "true",
    })
    .catch((error) => {
      console.error("Error initializing i18next:", error);
    });
}

export default i18n;
