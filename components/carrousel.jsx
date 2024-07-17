"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Carrousel = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/getCarousel');
        const data = await response.json();
        const images = data.map((row, index) => ({ imag: `data:image/jpeg;base64,${row.image}`, loaded: index === 0 }));
        setSlides(images);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { target } = entry;
          const index = target.dataset.index;
          setSlides(prevSlides => {
            const newSlides = [...prevSlides];
            newSlides[index].loaded = true;
            return newSlides;
          });
          observer.unobserve(target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    slideRefs.current.forEach(slide => {
      if (slide) {
        observer.observe(slide);
      }
    });

    return () => {
      if (observer) {
        slideRefs.current.forEach(slide => {
          if (slide) {
            observer.unobserve(slide);
          }
        });
      }
    };
  }, [slides]);

  useEffect(() => {
    const interv = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interv);
  }, [current]);

  const prevSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    current === slides.length - 1 ? setCurrent(0) : setCurrent(current + 1);
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
            <div
              className="flex justify-center w-full h-full flex-shrink-0"
              key={i}
              ref={el => (slideRefs.current[i] = el)}
              data-index={i}
            >
              {s.loaded ? (
                <img src={s.imag} className="w-auto h-full object-cover" />
              ) : (
                <div className="w-auto h-full bg-gray-200 flex items-center justify-center">
                  <span>Cargando...</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative bottom-9 flex w-full gap-3 justify-center items-center text-gray-200">
        <button onClick={prevSlide}>
          <ArrowBackIosNewRoundedIcon className="text-lg" />
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
        <button onClick={nextSlide}>
          <ArrowForwardIosRoundedIcon className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Carrousel;
