"use client";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslations } from "next-intl";

export default function BtnHome({ isCentered }) {
  const t = useTranslations("btn"); // Usamos las traducciones del menú de navegación (ej. "home")

  return (
    <div
      className={`${isCentered ? "flex justify-center" : "absolute left-0"}`}
    >
      {/* Botón de INICIO */}
      <Link href="/" passHref>
        <button
          type="button"
          className={`flex items-center gap-3 text-white shadow-lg p-2 bg-gray-500 rounded-r-md text-sm pr-3 tracking-wider ${
            isCentered ? 'rounded-md' : 'rounded-r-md'
          }`}
        >
          <HomeIcon /> {t("home")} {/* Traducción dinámica del botón */}
        </button>
      </Link>
    </div>
  );
}
