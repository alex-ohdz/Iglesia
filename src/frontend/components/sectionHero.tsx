"use client";

import useIntersectionObserver from "@hooks/useIntersectionObserver";

interface SectionHeroProps {
  imageUrl: string;
  title: string;
  description: string;
}

const SectionHero = ({ imageUrl, title, description }: SectionHeroProps) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section className="relative flex h-[45vh] min-h-[280px] items-center justify-center overflow-hidden bg-black text-white md:h-[55vh]">
      <img src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-3xl px-6 text-center transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h1 className="text-3xl font-display tracking-wide sm:text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm font-body sm:text-base md:text-lg">{description}</p>
      </div>
    </section>
  );
};

export default SectionHero;
