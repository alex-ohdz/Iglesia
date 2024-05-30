"use client";
import useIntersectionObserver from "@hooks/useIntersectionObserver.jsx";

const BoxText = () => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <div className="py-7 flex flex-col items-center bg-amber-50 text-amber-900">
      <h1 className="text-3xl font-serif mb-6  text-center">
        Bienvenidos a Nuestra Comunidad
      </h1>
      <div className="w-full flex items-center lg:flex-row flex-col md:items-center justify-items-start">
        <div className="flex-shrink-0 h-96 lg:w-96 sm:w-[500px] w-full mb-4">
          <img
            src="images/prueba3.jpg"
            alt="Descripción de la imagen"
            className="w-full h-full object-cover lg:rounded-r-full rounded-sm"
          />
        </div>

        <p
          ref={ref}
          className={`font-serif text-center lg:text-left max-w-full lg:mx-20 mx-6 fade-up ${
            isVisible ? "visible" : ""
          }`}
        >
          La Iglesia de San Juan Bautista de Remedios ubicada en San Juan de los
          Remedios, Villa Clara se le atribuye ser la iglesia más antigua de
          Cuba. La iglesia actual fue construida en 1692 sobre la estructura
          existente de una iglesia que fue construida originalmente en 1570. La
          torre-campanario es un diseño neoclásico y el interior es barroco.
          Algunas de las características más importantes son el techo
          ornamentado, el pan de oro y el altar de cedro cubierto todo tallado
          en madera y laminado en oro realizado por un artesano remediano de
          descendencia asiática Rogelio Attá y coloca retablos barrocos y
          colección pictórica en ambas naves de la iglesia. Es hoy la única
          iglesia barroca interior y exteriormente en Cuba siendo visitada
          permanente por turismo nacional e internacional que acuden a apreciar
          sus bienes conservados patrimoniales.
        </p>
      </div>
    </div>
  );
};

export default BoxText;
