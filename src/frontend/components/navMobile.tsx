"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@components/icons";
import LangChanger from "./langChanger";
import NavText from "./navText";

function NavMobile({ isMobile }) {
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b border-sanctuary-stone/60 bg-sanctuary-cream/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/">
            <h1 className="font-display text-lg text-sanctuary-shadow transition-colors duration-300 hover:text-sanctuary-terracotta">
              San Juan Bautista de Remedios
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <LangChanger />
            <button
              type="button"
              onClick={toggleDrawer}
              aria-label="Abrir menú"
              className="rounded-md p-2 text-sanctuary-shadow transition hover:bg-sanctuary-gold/40"
            >
              <Bars3Icon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>
      <div className="h-16" />
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <aside className="relative ml-auto flex h-full w-64 flex-col bg-sanctuary-cream p-4 shadow-lg transition-transform">
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Cerrar menú"
              className="self-end rounded-md p-2 text-sanctuary-shadow transition hover:bg-sanctuary-gold/40"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <nav className="mt-4">
              <NavText isMobile={isMobile} />
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export default NavMobile;
