"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@components/icons";
import LangChanger from "./langChanger";
import NavText from "./navText";

type NavMobileProps = {
  isHome: boolean;
};

function NavMobile({ isHome }: NavMobileProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      ? "bg-gradient-to-b from-black/70 via-black/30 to-transparent text-white backdrop-blur-sm"
      : "bg-sanctuaryLinen/95 text-sanctuaryBrick shadow-lg backdrop-blur";

  const borderClasses =
    navVariant === "overlay" ? "border-white/10" : "border-sanctuaryBrick/10";

  const titleClasses =
    navVariant === "overlay"
      ? "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
      : "text-sanctuaryBrick";

  const iconButtonClasses =
    navVariant === "overlay"
      ? "text-white hover:bg-white/10"
      : "text-sanctuaryBrick hover:bg-sanctuaryCream";

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b ${borderClasses} transition-all duration-500 ${headerClasses}`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sanctuaryGold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <h1
              className={`font-display text-sm uppercase tracking-[0.25em] transition-colors duration-300 ${titleClasses}`}
            >
              San Juan Bautista de Remedios
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <LangChanger variant={navVariant} />
            <button
              type="button"
              onClick={toggleDrawer}
              aria-label="Abrir menú"
              aria-expanded={isDrawerOpen}
              className={`rounded-full p-2 transition ${iconButtonClasses}`}
            >
              <Bars3Icon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <aside
            className="relative ml-auto flex h-full w-64 translate-x-0 flex-col bg-sanctuaryLinen/95 p-4 shadow-2xl transition-transform duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Cerrar menú"
              className="self-end rounded-full p-2 text-sanctuaryBrick transition hover:bg-sanctuaryCream"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="mt-6">
              <NavText layout="vertical" onNavigate={closeDrawer} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default NavMobile;
