"use client";
import Image from "next/image";
import NavText from "../components/nav";
import { useState, useEffect } from "react";

const items = [
  { text: "Bienvenidos", link: "#" },
  { text: "Sobre Nosotros", link: "#sobre" },
  { text: "Servicios", link: "#servicios" },
  { text: "Contacto", link: "#contacto" },
  { text: "Donar", link: "#donar" },
];
const imgage = "/images/IMG-REM.jpg";
const icon = "/icon/menu.png";

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
      <nav className="flex justify-between items-center py-4 px-4 text-white fixed top-0 left-0 right-0 bg-white z-10">
        <h1 className="text-black font-playfair text-xl">
          San Juan Bautista de Remedios
        </h1>
        {/* <NavText items={items} /> */}
        {isMobile ? (
          <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="bg-black">
            <img src={icon} alt="Menu" />menu
          </button>
        ) : (
          <NavText items={items} />
        )}
      </nav>
      <div className="pt-[3.7rem]">
        <div className="relative w-full h-screen">
          <Image
            src="/images/IMG-REM.jpg"
            alt="San Juan Bautista de Remedios"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        {/* Añadimos margen entre las secciones para una separación adecuada */}
        <section className="mt-8 bg-yellow-400 text-gray-800 text-center py-20">
          <h2 className="text-4xl font-serif mb-4 font-bold">
            Bienvenidos a Nuestra Comunidad
          </h2>
          <p className="font-sans">Un lugar de paz y encuentro espiritual.</p>
        </section>
        <div id="servicios" className="mt-8 py-8">
          <h2 className="text-xl font-bold">Nuestros Servicios</h2>
          <p>Descripción de los servicios ofrecidos...</p>
        </div>
      </div>
      {/* Aseguramos que el footer también esté separado adecuadamente */}
      <footer className="mt-8 bg-carmelita text-black text-center p-4">
        © 2024 Iglesia de Ejemplo. Todos los derechos reservados.
      </footer>
    </>
  );
}
