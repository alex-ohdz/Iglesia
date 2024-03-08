import React from 'react';

const Services = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <ServiceSection
          title="Bautismos"
		  ids="bautismos"
          description="La ceremonia de bautismo es un evento significativo en la vida espiritual de la familia y el infante. Nuestro servicio de bautismo está diseñado para hacer de este momento algo memorable y sagrado, proporcionando una experiencia personalizada que refleje las creencias y deseos de la familia. Desde la planificación hasta la ejecución, cuidamos cada detalle para asegurar que la ceremonia sea hermosa, respetuosa y acorde a tus expectativas."
        />
        <ServiceSection
          title="Casamientos"
		  ids="casamientos"
          description="Creemos que tu día de boda debe ser tan único como tu amor. Con nuestro servicio de casamientos, te ayudamos a crear una celebración inolvidable que capture perfectamente tu relación. Desde lugares de ensueño hasta decoraciones de ensueño, nuestro equipo está dedicado a convertir tus visiones en realidad, asegurando que cada aspecto de tu boda sea perfecto, sin importar lo grande o pequeño que sea."
        />
        <ServiceSection
          title="Ejemplo 3"
		  ids="#ejemplo3"
          description="Ejemplo 3 ofrece una gama de servicios diseñados para satisfacer tus necesidades específicas. Ya sea que estés buscando expandir tu negocio, mejorar tu bienestar personal o celebrar un hito, nuestro equipo dedicado está aquí para apoyarte. Con un enfoque personalizado y una atención meticulosa al detalle, nos esforzamos por superar tus expectativas y proporcionarte resultados excepcionales."
        />
        <ServiceSection
          title="Ejemplo 4"
		  ids="#ejemplo4"
          description="En Ejemplo 4, nos especializamos en brindar soluciones innovadoras que desafían el status quo. A través de una combinación de creatividad, experiencia y pasión, nuestro equipo trabaja incansablemente para entregar resultados que no solo cumplan, sino que superen tus expectativas. Ya sea que necesites asesoramiento estratégico, soporte técnico o servicios creativos, estamos comprometidos con tu éxito."
        />
      </div>
    </div>
  )
}

const ServiceSection = ({ title,ids, description }) => {
  return (
    <div className="w-full p-4">
      <div id={ids} className="max-w-screen-lg mx-auto p-5 scroll-mt-[100px]">
        <h3 className="text-2xl font-serif mb-4 text-amber-900">{title}</h3>
        <p className="text-amber-800 font-serif leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Services;
