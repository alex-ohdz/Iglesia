"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const heroSlides = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    titleKey: "hero.slides.0.title",
    descriptionKey: "hero.slides.0.description",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80",
    titleKey: "hero.slides.1.title",
    descriptionKey: "hero.slides.1.description",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    titleKey: "hero.slides.2.title",
    descriptionKey: "hero.slides.2.description",
  },
];

const HomeHero = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const slides = useMemo(() => heroSlides, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSelect = (index: number) => {
    setCurrent(index);
  };

  return (
    <section className="relative flex h-[60vh] min-h-[320px] items-center justify-center overflow-hidden bg-black text-white md:h-[70vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.imageUrl}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={`${t("hero.slides." + index + ".title")}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-12">
            <h1
              className={`text-3xl font-display tracking-wide sm:text-4xl md:text-5xl ${
                index === current ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } transition-all duration-700 ease-out`}
            >
              {t(slide.titleKey)}
            </h1>
            <p
              className={`mt-4 max-w-2xl text-sm font-body sm:text-base md:text-lg ${
                index === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } transition-all duration-700 ease-out delay-150`}
            >
              {t(slide.descriptionKey)}
            </p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.imageUrl}
            type="button"
            onClick={() => handleSelect(index)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              index === current ? "bg-sanctuaryGold" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={t("hero.slides." + index + ".title")}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeHero;
