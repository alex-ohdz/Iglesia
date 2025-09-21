"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Definición de los servicios
const servicios = [
  {
    id: 1,
    nombre: "Bautismo",
    descripcion:
      "La ceremonia de bautismo es un evento significativo en la vida espiritual de la familia y el infante. Nuestro servicio de bautismo está diseñado para hacer de este momento algo memorable y sagrado, proporcionando una experiencia personalizada que refleje las creencias y deseos de la familia. Desde la planificación hasta la ejecución, cuidamos cada detalle para asegurar que la ceremonia sea hermosa, respetuosa y acorde a tus expectativas.",
  },
  {
    id: 2,
    nombre: "Boda",
    descripcion:
      "Creemos que tu día de boda debe ser tan único como tu amor. Con nuestro servicio de casamientos, te ayudamos a crear una celebración inolvidable que capture perfectamente tu relación. Desde lugares de ensueño hasta decoraciones de ensueño, nuestro equipo está dedicado a convertir tus visiones en realidad, asegurando que cada aspecto de tu boda sea perfecto, sin importar lo grande o pequeño que sea.",
  },
  {
    id: 3,
    nombre: "Ejemplo 3",
    descripcion:
      "Ejemplo 3 ofrece una gama de servicios diseñados para satisfacer tus necesidades específicas. Ya sea que estés buscando expandir tu negocio, mejorar tu bienestar personal o celebrar un hito, nuestro equipo dedicado está aquí para apoyarte. Con un enfoque personalizado y una atención meticulosa al detalle, nos esforzamos por superar tus expectativas y proporcionarte resultados excepcionales.",
  },
];

function Services() {
  const { t } = useTranslation();
  const [value, setValue] = useState(1);

  const handleChange = (id) => {
    setValue(id);
  };

  const selectServices = servicios.find((servicio) => servicio.id === value);

  return (
    <div className="anchored-section2 bg-sanctuary-stone font-body" id="services">
      <h1 className="py-6 text-center font-display text-3xl text-sanctuary-terracotta">
        {t(`Servicios`)}
      </h1>
      <div className="flex h-14 w-full justify-between">
        <div className="flex h-full w-1/3 items-center justify-center">
          <button
            className={`h-full w-full rounded-md font-display tracking-[0.18em] text-sm transition ${
              value === 1
                ? "bg-sanctuary-terracotta text-sanctuary-cream shadow-md"
                : "bg-sanctuary-shadow/90 text-sanctuary-cream/90 hover:bg-sanctuary-terracotta/80 hover:text-sanctuary-cream"
            }`}
            onClick={() => handleChange(1)}
            disabled={value === 1}
          >
            Bautismos
          </button>
        </div>
        <div className="flex h-full w-1/3 items-center justify-center">
          <button
            className={`h-full w-full rounded-md font-display tracking-[0.18em] text-sm transition ${
              value === 2
                ? "bg-sanctuary-terracotta text-sanctuary-cream shadow-md"
                : "bg-sanctuary-shadow/90 text-sanctuary-cream/90 hover:bg-sanctuary-terracotta/80 hover:text-sanctuary-cream"
            }`}
            onClick={() => handleChange(2)}
            disabled={value === 2}
          >
            Boda
          </button>
        </div>
        <div className="flex h-full w-1/3 items-center justify-center">
          <button
            className={`h-full w-full rounded-md font-display tracking-[0.18em] text-sm transition ${
              value === 3
                ? "bg-sanctuary-terracotta text-sanctuary-cream shadow-md"
                : "bg-sanctuary-shadow/90 text-sanctuary-cream/90 hover:bg-sanctuary-terracotta/80 hover:text-sanctuary-cream"
            }`}
            onClick={() => handleChange(3)}
            disabled={value === 3}
          >
            Lorem
          </button>
        </div>
      </div>
      <div className="mx-10 flex items-center justify-center py-10 text-md text-sanctuary-shadow">
        {selectServices.descripcion}
      </div>
    </div>
  );
}

export default Services;
