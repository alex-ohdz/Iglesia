"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

function Services() {
  const [value, setValue] = useState("baptism"); // Cambié el valor inicial a "baptism"
  const t = useTranslations("services");

  const servicios = {
    baptism: {
      id: 1,
      nombre: t("baptism.title"),
      descripcion: t("baptism.description"),
    },
    wedding: {
      id: 2,
      nombre: t("wedding.title"),
      descripcion: t("wedding.description"),
    },
    example3: {
      id: 3,
      nombre: t("example3.title"),
      descripcion: t("example3.description"),
    },
  };

  const handleChange = (id) => {
    setValue(id);
  };

  const selectServices = servicios[value];

  return (
    <div className="font-roboto bg-amber-50 anchored-section2 mb-14" id="services">
      <h1 className="text-3xl font-serif text-center py-8 text-amber-900">{t('title')}</h1>
      <div className="flex justify-between h-14 w-full">
        <div className="flex justify-center items-center h-full w-1/3">
          <button
            className={`h-full w-full text-white ${value === "baptism" ? 'bg-amber-950 opacity-80' : 'bg-amber-950 hover:bg-950 hover:opacity-60'}`}
            onClick={() => handleChange("baptism")}
            disabled={value === "baptism"}
          >
            {t('baptism.title')}
          </button>
        </div>
        <div className="flex justify-center items-center h-full w-1/3">
          <button
            className={`h-full w-full text-white ${value === "wedding" ? 'bg-amber-950 opacity-80' : 'bg-amber-950 hover:bg-950 hover:opacity-60'}`}
            onClick={() => handleChange("wedding")}
            disabled={value === "wedding"}
          >
            {t('wedding.title')}
          </button>
        </div>
        <div className="flex justify-center items-center h-full w-1/3">
          <button
            className={`h-full w-full text-white ${value === "example3" ? 'bg-amber-950 opacity-80' : 'bg-amber-950 hover:bg-950 hover:opacity-60'}`}
            onClick={() => handleChange("example3")}
            disabled={value === "example3"}
          >
            {t('example3.title')}
          </button>
        </div>
      </div>
      <div className="flex mx-10 py-10 items-center justify-center text-black text-md">
        {selectServices.descripcion}
      </div>
    </div>
  );
}

export default Services;
