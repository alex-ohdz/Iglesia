"use client";

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { useState, useRef, useEffect } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

const flags = [
  { code: "en", imgF: "/icons/flags/en.png" },
  { code: "es", imgF: "/icons/flags/es.png" },
  { code: "po", imgF: "/icons/flags/po.png" },
];

const LangChanger = () => {
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale(); // Obtiene el idioma actual
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(
    flags.find(flag => flag.code === currentLocale) || flags[1] // Selecciona la bandera correspondiente al idioma actual
  );
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectFlag = (flag) => {
    setSelectedFlag(flag);
    setIsOpen(false);

    // Cambiar el idioma al seleccionar la bandera
    startTransition(() => {
      window.location.href = `/${flag.code}`; // Cambia la página al idioma seleccionado
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ml-2 p-1 ${isOpen ? "bg-yellow-100" : ""}`} ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center">
        <img
          src={selectedFlag.imgF}
          alt={selectedFlag.code + " flag"}
          className="w-6 h-6"
        />
        <KeyboardArrowUpRoundedIcon className={`text-amber-900 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="flex flex-col mt-2 absolute z-20 top-6 right-6 bg-yellow-100 items-center pt-1">
          {flags
            .filter((flag) => flag.code !== selectedFlag.code)
            .map((flag, index) => (
              <img
                key={index}
                src={flag.imgF}
                alt={`${flag.code} flag`}
                className="w-6 h-6 m-1 cursor-pointer"
                onClick={() => handleSelectFlag(flag)} // Cambiar idioma al hacer clic
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default LangChanger;
