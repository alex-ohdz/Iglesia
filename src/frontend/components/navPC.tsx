"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LangChanger from "./langChanger";
import NavText from "./navText";

type NavPCProps = {
  isHome: boolean;
};

function NavPC({ isHome }: NavPCProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariant: "solid" | "overlay" = isHome && !scrolled ? "overlay" : "solid";

  const headerClasses =
    navVariant === "overlay"
      ? "bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white backdrop-blur-sm"
      : "bg-sanctuaryLinen/95 text-sanctuaryBrick shadow-lg backdrop-blur";

  const borderClasses =
    navVariant === "overlay" ? "border-white/10" : "border-sanctuaryBrick/10";

  const titleClasses =
    navVariant === "overlay"
      ? "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
      : "text-sanctuaryBrick";

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b ${borderClasses} transition-all duration-500 ${headerClasses}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sanctuaryGold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <h1
            className={`font-display text-base uppercase tracking-[0.2em] transition-colors duration-300 sm:text-lg md:text-xl ${titleClasses}`}
          >
            San Juan Bautista de Remedios
          </h1>
        </Link>
        <div className="flex items-center gap-5 md:gap-6">
          <NavText layout="horizontal" variant={navVariant} />
          <LangChanger variant={navVariant} />
        </div>
      </div>
    </header>
  );
}

export default NavPC;
