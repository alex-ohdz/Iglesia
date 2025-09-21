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
    <section className="relative mt-[-80px] flex h-[60vh] min-h-[320px] items-center justify-center overflow-hidden bg-black text-white md:mt-[-96px] md:h-[70vh]">
      {slides.map((slide, index) => {
        const isActive = index === current;
        const isEven = index % 2 === 0;
        const textOffsetClass = isEven
          ? "-translate-x-16 md:-translate-x-24"
          : "translate-x-16 md:translate-x-24";
        const imageOffsetClass = isEven
          ? "translate-x-6 scale-105"
          : "-translate-x-6 scale-105";

        return (
          <div
            key={slide.imageUrl}
            className={`absolute inset-0 transform-gpu transition-opacity duration-1000 ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={`${t("hero.slides." + index + ".title")}`}
              className={`h-full w-full object-cover transition-transform duration-[2000ms] ease-out transform-gpu ${
                isActive ? "translate-x-0 scale-100" : imageOffsetClass
              }`}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-12">
              <div
                className={`flex max-w-2xl flex-col items-center text-center transition-all duration-700 ease-out transform-gpu ${
                  isActive ? "translate-x-0 opacity-100" : `${textOffsetClass} opacity-0`
                }`}
              >
                <h1
                  className={`text-3xl font-display tracking-wide transition-all duration-700 ease-out sm:text-4xl md:text-5xl ${
                    isActive
                      ? "translate-x-0 opacity-100 delay-150"
                      : `${isEven ? "-translate-x-6" : "translate-x-6"} opacity-0 delay-0`
                  }`}
                >
                  {t(slide.titleKey)}
                </h1>
                <p
                  className={`mt-4 text-sm font-body transition-all duration-700 ease-out sm:text-base md:text-lg ${
                    isActive
                      ? "translate-x-0 opacity-100 delay-300"
                      : `${isEven ? "-translate-x-4" : "translate-x-4"} opacity-0 delay-0`
                  }`}
                >
                  {t(slide.descriptionKey)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
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
