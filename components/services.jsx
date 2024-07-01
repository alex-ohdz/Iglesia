"use client";
import { useState } from "react";

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
  const [value, setValue] = useState(1);

  const handleChange = (id) => {
    setValue(id);
  };

  const selectServices = servicios.find((servicio) => servicio.id === value);

  return (
    <div className="font-roboto bg-amber-50">
      <h1 className="text-center py-6 text-2xl">Servicios</h1>
      <div className="flex justify-between h-14 w-full">
        <div className="flex justify-center items-center h-full w-1/3">
          <button
            className={`h-full w-full text-white  ${value === 1 ? 'bg-amber-950 opacity-80' : 'bg-amber-950 hover:bg-950 hover:opacity-60'}`}
            onClick={() => handleChange(1)}
            disabled={value === 1}
          >
            Bautismos
          </button>
        </div>
        <div className="flex justify-center items-center h-full w-1/3">
          <button
            className={`h-full w-full text-white  ${value === 2 ? 'bg-amber-950 opacity-80' : 'bg-amber-950 hover:bg-950 hover:opacity-60'}`}
            onClick={() => handleChange(2)}
            disabled={value === 2}
          >
            Boda
          </button>
        </div>
        <div className="flex justify-center items-center h-full w-1/3">
          <button
            className={`h-full w-full text-white  ${value === 3 ? 'bg-amber-950 opacity-80' : 'bg-amber-950 hover:bg-950 hover:opacity-60'}`}
            onClick={() => handleChange(3)}
            disabled={value === 3}
          >
            Lorem
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
