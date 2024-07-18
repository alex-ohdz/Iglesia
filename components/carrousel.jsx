"use client";
import { useState, useEffect, useRef } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Carrousel = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef([]);

  useEffect(() => {
    const fetchImagesAndCount = async () => {
      try {
        const countResponse = await fetch('/api/getCarouselCount');
        const countData = await countResponse.json();
        const placeholders = Array.from({ length: countData.count }, (_, index) => ({ imag: '', loaded: false }));

        const imageResponse = await fetch('/api/getCarousel');
        const imageData = await imageResponse.json();
        const images = imageData.map((row, index) => ({ imag: `data:image/jpeg;base64,${row.image}`, loaded: false }));

        // Update placeholders with actual images
        images.forEach((image, index) => {
          placeholders[index] = image;
        });

        setSlides(placeholders);
      } catch (error) {
        console.error('Error fetching images or count', error);
      }
    };

    fetchImagesAndCount();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      for (let i = 0; i < slides.length; i++) {
        const img = new Image();
        img.src = slides[i].imag;
        img.onload = () => {
          setSlides(prevSlides => {
            const newSlides = [...prevSlides];
            newSlides[i].loaded = true;
            return newSlides;
          });
        };
      }
    };

    loadImages();
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
    <div className="w-full ">
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
                <div className="w-auto h-full bg-gray-200 flex items-center justify-center animate-pulse">
                  <div className="w-full h-full bg-gray-300"></div>
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
