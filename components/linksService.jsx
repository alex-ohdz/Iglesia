"use client";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import { useState } from "react";

const ServicesLinks = ({ isMobile }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className={`${isMobile ? "mb-4" : "mr-3 relative"} group`}>
      <button
        onClick={toggleDropdown}
        className="text-amber-800 hover:text-yellow-500 transition-colors duration-300 text-lg font-playfair tracking-wider flex items-center"
      >
        Servicios
        <ArrowDropDownIcon />
      </button>
      {showDropdown && (
        <div className="fixed top-5 left-0 mt-10 w-screen shadow-md z-50 bg-slate-100 justify-center items-center">
          {/* Aquí se convierte el dropdown en un "mini-nav" */}
          <nav className="flex flex-row">
            <Link
              href="#bautismos"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Bautismos
            </Link>
            <Link
              href="#casamientos"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Casamientos
            </Link>
            <Link
              href="/nuevo-servicio-2"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Ejemplo3
            </Link>
            <Link
              href="/nuevo-servicio-2"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Ejemplo4
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ServicesLinks;
