"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LangChanger from "./langChanger";
import NavText from "./navText";

function NavPC({ isMobile }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-8">
          <Link href="/">
            <h1 className="text-sanctuaryBrick font-display text-lg sm:text-xl md:text-2xl">
              San Juan Bautista de Remedios
            </h1>
          </Link>
          <div className="flex flex-1 items-center justify-end gap-6">
            <NavText isMobile={isMobile} />
            <LangChanger />
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  );
}

export default NavPC;
