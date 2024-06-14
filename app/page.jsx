"use client";
import BoxText from "@components/boxText";
import NavPC from "@components/navPC";
import NavMobile from "@components/navMobile";
import { useState, useEffect } from "react";
import FooterApp from "@components/footerApp.jsx";
import Carrousel from "@components/carrousel.jsx";
import Noticias from "@components/noticias/noticias.jsx";
import Services from "@components/services";

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
      <div className="pb-14">
        {isMobile ? (
          <NavPC isMobile={isMobile} />
        ) : (
          <NavMobile isMobile={isMobile} />
        )}
      </div>
      <Carrousel />
      <aside className="">
        <BoxText />
        <Noticias />
        <Services/>
      </aside>
      <section></section>
      <footer>
        <FooterApp />
      </footer>
    </>
  );
}
