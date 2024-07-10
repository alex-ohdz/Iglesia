"use client";
import { useState, useEffect } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const slides = [
  { imag: "/images/prueba1.jpg" },
  { imag: "/images/prueba2.jpg" },
  { imag: "images/prueba3.jpg" },
];

const Carrousel = () => {
  let [current, setCurrent] = useState(0);

  useEffect(() => {
    const interv = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interv);
  }, [current]);

  let prevSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };
  let nextSlide = () => {
    current === slides.length - 1 ? setCurrent(0) : setCurrent(current + 1);
  };

  return (
    <div className=" md:w-[60%] w-full h-auto m-auto">
      <div className="overflow-hidden relative w-full">
        <div
          className={"flex transition ease-out duration-700 w-full h-full"}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((s, i) => (
            <div className="w-full h-auto flex-shrink-0" key={i}>
              <img key={i} src={s.imag} className="w-full h-full object-fill" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative bottom-9 flex w-full gap-3 justify-center items-center text-gray-200">
        <button onClick={prevSlide}>
          < ArrowBackIosNewRoundedIcon className="text-lg"/>
        </button>
        {slides.map((x, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setCurrent(i);
              }}
              className={`rounded-full w-2 h-2 cursor-pointer ${
                i == current ? "bg-gray-200" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
        <button onClick={nextSlide}>
          <ArrowForwardIosRoundedIcon className="text-lg"/>
        </button>
      </div>
    </div>
  );
};

export default Carrousel;
