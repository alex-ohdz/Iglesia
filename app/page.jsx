"use client";
import Image from "next/image";
import BoxText from "@components/boxText";
import Services from "@components/services";
import NavPC from "@components/navPC";
import { useState, useEffect } from "react";
import AboutUs from "@components/aboutUs";
import ContactUs from "@components/contactUs";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 800);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavPC />
      <div className="pt-[3.5rem]">
        <div className="relative w-full h-screen">
          <Image
            src="/images/IMG-REM.jpg"
            alt="San Juan Bautista de Remedios"
            fill
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="relative z-1">
            <BoxText />
          </div>
        </div>
        <section className="mt-8 bg-yellow-400 text-gray-800 text-center py-20">
          <h2 className="text-4xl font-serif mb-4 font-bold">
            Bienvenidos a Nuestra Comunidad
          </h2>
          <p className="font-sans">Un lugar de paz y encuentro espiritual.</p>
        </section>
<AboutUs/>
        <Services />
        <ContactUs />
      </div>
      {/* Aseguramos que el footer también esté separado adecuadamente */}
      <footer className="mt-8 bg-carmelita text-black text-center p-4">
        © 2024 Iglesia de Ejemplo. Todos los derechos reservados.
      </footer>
    </>
  );
}
