"use client";
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
      <div className="pb-14">
        {isMobile ? (
          <NavPC isMobile={isMobile} />
        ) : (
          <NavMobile isMobile={isMobile} />
        )}
      </div>
      <Carrousel />
      <aside className="bg-amber-100">
        <BoxText />
      </aside>
      <section></section>
      <footer>
        <FooterApp />
      </footer>
    </>
  );
}
