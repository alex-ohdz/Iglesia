"use client";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronUpIcon } from "@components/icons";

const flags = [
  { code: "en", imgF: "/icons/flags/en.png" },
  { code: "es", imgF: "/icons/flags/es.png" },
  { code: "po", imgF: "/icons/flags/po.png" },
];

const LangChanger = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(
    () => flags.find((flag) => flag.code === i18n.language) || flags[1]
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const fileId = selectedFlag.code;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectFlag = (flag) => {
    setSelectedFlag(flag);
    setIsOpen(false);
    i18n.changeLanguage(flag.code);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const currentFlag = flags.find((flag) => flag.code === i18n.language);
    if (currentFlag && currentFlag.code !== selectedFlag.code) {
      setSelectedFlag(currentFlag);
    }
  }, [i18n.language, selectedFlag.code]);

  return (
    <div
      ref={dropdownRef}
      className={`relative ml-2 rounded-md p-1 transition hover:bg-sanctuary-gold/20 ${
        isOpen ? "bg-sanctuary-gold/40" : ""
      }`}
    >
      <button onClick={toggleDropdown} className="flex items-center gap-1">
        <img
          src={selectedFlag.imgF}
          alt={`${selectedFlag.code} flag`}
          className="h-6 w-6"
        />
        <ChevronUpIcon
          className={`h-4 w-4 text-sanctuary-shadow transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-8 z-20 flex flex-col items-center gap-1 rounded-md bg-sanctuary-gold/30 p-2 shadow-md">
          {flags
            .filter((flag) => flag.code !== selectedFlag.code)
            .map((flag) => (
              <button
                key={`${fileId}-${flag.code}`}
                type="button"
                onClick={() => handleSelectFlag(flag)}
                className="rounded-md p-1 transition hover:bg-sanctuary-gold/60"
              >
                <img src={flag.imgF} alt={`${flag.code} flag`} className="h-6 w-6" />
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LangChanger;
