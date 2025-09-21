"use client";

import Link from "next/link";

type AdminNavbarProps = {
  sections?: Array<{ id: string; label: string }>;
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  showSections?: boolean;
};

const AdminNavbar = ({
  sections = [],
  currentSection,
  onSectionChange,
  showSections = true,
}: AdminNavbarProps) => {
  const handleSectionClick = (sectionId: string) => {
    if (!onSectionChange) {
      return;
    }

    onSectionChange(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-sanctuaryGold/40 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-8 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sanctuaryTerracotta">
            Panel Administrativo
          </p>
          <h1 className="text-3xl font-bold leading-tight text-sanctuaryBrick">
            Centro de Gestión
          </h1>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-sanctuaryTerracotta px-5 py-2 text-sm font-semibold text-sanctuaryTerracotta transition hover:border-sanctuaryBrick hover:bg-sanctuaryBrick hover:text-white focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta focus:ring-offset-2"
          >
            Volver al inicio
          </Link>
          {showSections && sections.length > 0 && (
            <nav
              aria-label="Secciones del panel administrativo"
              className="flex flex-wrap items-center justify-end gap-2"
            >
              {sections.map((section) => {
                const isActive = section.id === currentSection;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(section.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta focus:ring-offset-2 ${
                      isActive
                        ? "border-sanctuaryBrick bg-sanctuaryBrick text-white shadow"
                        : "border-sanctuaryTerracotta text-sanctuaryTerracotta hover:bg-sanctuaryTerracotta/10"
                    }`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
