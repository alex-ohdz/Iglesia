"use client";
import Image from "next/image";
import BoxText from "@components/boxText";
import NavPC from "@components/navPC";
import NavMobile from "@components/navMobile";
import { useState, useEffect } from "react";
import AboutUs from "@components/aboutUs";
import FooterApp from "@components/footerApp";
import Carrousel from "@components/carrousel";
import ImageCircle from "@components/weAre";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth > 800);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <NavPC isMobile={isMobile} />
      ) : (
        <NavMobile isMobile={isMobile} />
      )}

      <Carrousel />
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

        <section className="mt-8 bg-yellow-400 text-gray-800 text-center py-20">
          <h2 className="text-4xl font-serif mb-4 font-bold">
            Bienvenidos a Nuestra Comunidad
          </h2>
          <p className="font-sans">Un lugar de paz y encuentro espiritual.</p>
        </section>
        <ImageCircle/>
        <AboutUs />
        {/* <Services /> */}
      </div>
      <footer>
        <FooterApp />
      </footer>
    </>
  );
}
