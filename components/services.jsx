'use client'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import { useState } from "react";

const Services = ({isMobile}) => {
  const [showDropdown, setShowDropdown] = useState(false);
//   const containerClasses = isMobile ? "mb-4" : "mr-3 relative";
const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <div
      className={`${isMobile ? "mb-4" : "mr-3 relative"} group`}
    >
      <button onClick={toggleDropdown} className="text-amber-800 hover:text-yellow-500 transition-colors duration-300 text-lg font-playfair tracking-wider flex items-center">
        Servicios
        <ArrowDropDownIcon />
      </button>
      {showDropdown && (
        <div className="absolute left-0 mt-1 py-2 w-40 bg-white shadow-md rounded">
          {/* Links del dropdown */}
          <Link
            href="/nuevo-servicio-1"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Nuevo Servicio 1
          </Link>
          <Link
            href="/nuevo-servicio-2"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Nuevo Servicio 2
          </Link>
          {/* Más links según necesites */}
        </div>
      )}
    </div>
  );
};

export default Services;
