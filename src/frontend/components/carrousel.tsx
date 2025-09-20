"use client";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@components/icons";

type CarouselResponse = {
  success?: boolean;
  data?: Array<{
    image?: string;
    image_url?: string;
    imageUrl?: string;
  }>;
};

type Slide = {
  imag: string;
};

const Carrousel = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/getCarousel");
        const payload: CarouselResponse = await response.json();
        const entries = Array.isArray(payload.data) ? payload.data : [];
        const images = entries
          .map((row) => {
            if (row.image) {
              const prefixed = row.image.startsWith("data:")
                ? row.image
                : `data:image/jpeg;base64,${row.image}`;
              return { imag: prefixed };
            }

            const source = row.image_url ?? row.imageUrl;
            if (source) {
              return { imag: source };
            }

            return null;
          })
          .filter((value): value is Slide => value !== null);

        setSlides(images);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (slides.length === 0) {
      return;
    }

    const interv = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(interv);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden relative w-full h-[400px] sm:h-[450px] md:h-[480px] lg:h-[530px]">
        <div
          className="flex transition ease-out duration-700 w-full h-full"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((s, i) => (
            <div className="flex justify-center w-full h-full flex-shrink-0" key={i}>
              <img src={s.imag} className="w-auto h-full object-cover" alt={`Imagen del carrusel ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative bottom-9 flex w-full gap-3 justify-center items-center text-gray-200">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Anterior"
          className="rounded-full bg-black/40 p-1 text-gray-100 transition hover:bg-black/60"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {slides.map((x, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrent(i);
            }}
            className={`rounded-full w-2 h-2 cursor-pointer ${i === current ? "bg-gray-200" : "bg-gray-500"}`}
          ></div>
        ))}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Siguiente"
          className="rounded-full bg-black/40 p-1 text-gray-100 transition hover:bg-black/60"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Carrousel;
