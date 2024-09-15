"use client";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { useTranslations } from "next-intl"; // Usa useTranslations para obtener las traducciones

const BoxText = () => {
  const t = useTranslations('boxText'); // Obtener las traducciones de la sección 'boxText'
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <div className="py-7 flex flex-col items-center bg-amber-50 text-amber-900">
      <h1 className="text-3xl font-serif mb-6 text-center">
        {t('title')} 
      </h1>
      <div className="w-full flex items-center lg:flex-row flex-col md:items-center justify-items-start">
        <div className="flex-shrink-0 h-96 lg:w-96 sm:w-[500px] w-full mb-4">
          <img
            src="/images/img1.jpg"
            alt="image_description"
            className="w-full h-full object-cover lg:rounded-r-full rounded-sm"
          />
        </div>
        <p
          ref={ref}
          className={`font-serif text-center lg:text-left max-w-full lg:mx-20 mx-6 fade-up ${
            isVisible ? "visible" : ""
          }`}
        >
          {t('content')} 
        </p>
      </div>
    </div>
  );
};

export default BoxText;
