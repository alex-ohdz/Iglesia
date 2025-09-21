"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronUpIcon } from "@components/icons";

type LangChangerProps = {
  variant?: "solid" | "overlay";
};

type FlagOption = {
  code: string;
  imgF: string;
  label: string;
};

const flags: FlagOption[] = [
  { code: "en", imgF: "/icons/flags/en.png", label: "English" },
  { code: "es", imgF: "/icons/flags/es.png", label: "Español" },
  { code: "po", imgF: "/icons/flags/po.png", label: "Português" },
];

const variantStyles = {
  solid: {
    button:
      "border border-sanctuaryBrick/20 bg-white text-sanctuaryBrick shadow-lg hover:bg-sanctuaryCream/70",
    icon: "text-sanctuaryBrick",
    dropdown:
      "border border-sanctuaryBrick/15 bg-white/95 text-sanctuaryBrick backdrop-blur",
    option: "hover:bg-sanctuaryCream/50",
    label: "",
  },
  overlay: {
    button:
      "border border-white/40 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-lg hover:bg-white/20",
    icon: "text-white",
    dropdown: "border border-white/25 bg-black/60 text-white backdrop-blur-xl",
    option: "hover:bg-white/10",
    label: "drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]",
  },
};

const getFlagByCode = (code: string) => flags.find((flag) => flag.code === code);

const LangChanger = ({ variant = "solid" }: LangChangerProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const normalizedLanguage = (i18n.language || "").split("-")[0];
  const [selectedFlag, setSelectedFlag] = useState<FlagOption>(
    () => getFlagByCode(normalizedLanguage) ?? flags[1]
  );

  const styles = variantStyles[variant] ?? variantStyles.solid;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectFlag = (flag: FlagOption) => {
    setSelectedFlag(flag);
    setIsOpen(false);
    void i18n.changeLanguage(flag.code);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const currentLanguage = (i18n.language || "").split("-")[0];
    const currentFlag = getFlagByCode(currentLanguage);

    if (currentFlag && currentFlag.code !== selectedFlag.code) {
      setSelectedFlag(currentFlag);
    }
  }, [i18n.language, selectedFlag.code]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`group flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sanctuaryGold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-sm ${styles.button}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Cambiar idioma"
      >
        <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/90 shadow-inner ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
          <img
            src={selectedFlag.imgF}
            alt={`${selectedFlag.label} flag`}
            className="h-full w-full object-cover"
          />
        </span>
        <span className={`block sm:hidden ${styles.label}`}>
          {selectedFlag.code.toUpperCase()}
        </span>
        <span className={`hidden sm:inline ${styles.label}`}>{selectedFlag.label}</span>
        <ChevronUpIcon
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${styles.icon}`}
        />
      </button>
      <div
        className={`absolute right-0 top-12 z-50 w-44 origin-top rounded-2xl px-3 py-3 shadow-xl transition-all duration-300 ${
          styles.dropdown
        } ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"}`}
        role="listbox"
        aria-hidden={!isOpen}
      >
        <ul className="flex flex-col gap-1">
          {flags
            .filter((flag) => flag.code !== selectedFlag.code)
            .map((flag) => (
              <li key={flag.code}>
                <button
                  type="button"
                  onClick={() => handleSelectFlag(flag)}
                  className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sanctuaryGold/70 ${styles.option}`}
                  role="option"
                  aria-selected={false}
                >
                  <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/90 shadow-inner ring-1 ring-black/5">
                    <img
                      src={flag.imgF}
                      alt={`${flag.label} flag`}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span>{flag.label}</span>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LangChanger;
