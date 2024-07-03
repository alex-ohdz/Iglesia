"use client";

import { useTranslation } from 'react-i18next';
import "../i18n";
import useIntersectionObserver from "@hooks/useIntersectionObserver.jsx";

const BoxText = () => {
  const { t, ready } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  if (!ready) return null;

  return (
    <div className="py-7 flex flex-col items-center bg-amber-50 text-amber-900">
      <h1 className="text-3xl font-serif mb-6 text-center">
        {t('welcome')}
      </h1>
      <div className="w-full flex items-center lg:flex-row flex-col md:items-center justify-items-start">
        <div className="flex-shrink-0 h-96 lg:w-96 sm:w-[500px] w-full mb-4">
          <img
            src="/images/img1.jpg"
            alt={t('image_description')}
            className="w-full h-full object-cover lg:rounded-r-full rounded-sm"
          />
        </div>

        <p
          ref={ref}
          className={`font-serif text-center lg:text-left max-w-full lg:mx-20 mx-6 fade-up ${isVisible ? "visible" : ""}`}
        >
          {t('description')}
        </p>
      </div>
    </div>
  );
};

export default BoxText;
