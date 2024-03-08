"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavText from "@components/linksNav";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BoxText from "@components/boxText";
import Services from "@components/services";


const items = [
  // { text: "Bienvenidos", link: "#" },
  { text: "Sobre Nosotros", link: "#sobre" },
  // { text: "Servicios", link: "#servicios" },
  { text: "Contacto", link: "#contacto" },
  { text: "Donar", link: "#donar" },
];

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
        <Link href={"#"}>
          <h1 className="text-amber-900 font-playfair text-2xl">
            San Juan Bautista de Remedios
          </h1>
        </Link>
        {isMobile ? (
          <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <MenuIcon
              style={{ fontSize: "30px", background: "white" }}
              className="iconClose"
            />
          </button>
        ) : (
          <NavText items={items} isMobile={isMobile} />

        )}

        {isDrawerOpen && (
          <div className="fixed top-0 right-0 w-auto max-w-full h-full z-30 bg-white shadow-lg">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 bg-white"
            >
              <CloseIcon
                style={{
                  
                  fontSize: "30px",
                  background: "white",
                }}
                className="iconClose"
              />
            </button>
            <NavText items={items} isMobile={isMobile} />

          </div>
        )}
      </nav>
      <div className="pt-[3.7rem]">
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
          <BoxText/>
        </div>
        </div>
        

        {/* Añadimos margen entre las secciones para una separación adecuada */}
        <section className="mt-8 bg-yellow-400 text-gray-800 text-center py-20">
          <h2 className="text-4xl font-serif mb-4 font-bold">
            Bienvenidos a Nuestra Comunidad
          </h2>
          <p className="font-sans">Un lugar de paz y encuentro espiritual.</p>
        </section>
        
        <Services/>
      </div>
      {/* Aseguramos que el footer también esté separado adecuadamente */}
      <footer className="mt-8 bg-carmelita text-black text-center p-4">
        © 2024 Iglesia de Ejemplo. Todos los derechos reservados.
      </footer>
    </>
  );
}
