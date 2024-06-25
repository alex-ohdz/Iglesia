"use client";
import { useState, useEffect } from "react";
import BoxText from "@components/boxText";
import NavPC from "@components/navPC";
import NavMobile from "@components/navMobile";
import Services from "@components/services";
import FooterApp from "@components/footerApp";
import Carrousel from "@components/carrousel";
import Noticias from "@components/noticias/noticias";

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
      </aside>

      <section>
        <Services />
      </section>
      <footer>
        <FooterApp />
      </footer>
    </>
  );
}
