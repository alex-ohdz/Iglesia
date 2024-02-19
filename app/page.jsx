// Asegúrate de importar la fuente Inter en tu proyecto, similar a como se hizo con Merriweather.
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-white h-full">
      <div className="relative">
        <nav className="flex justify-between items-center py-6 px-4  text-white fixed top-0 left-0 right-0 z-20 ">
          <h1 className="text-white font-merriweather text-3xl font-bold">
            Iglesia San Juan Bautista
          </h1>
          <div>
            <a
              href="#sobre"
              className="text-white hover:text-stone-400 mr-4 transition-colors duration-300"
            >
              Sobre Nosotros
            </a>
            <a
              href="#servicios"
              className="text-white hover:text-stone-400 transition-colors duration-300"
            >
              Servicios
            </a>
          </div>
        </nav>
        <div className="w-full h-screen">
          <Image
            src="/images/san-juan-bautista-de-remedios.jpg"
            alt="San Juan Bautista de Remedios"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>

      <section className="bg-yellow-400 text-gray-800 text-center py-20 mt-[100vh]">
        <h2 className="text-4xl font-serif mb-4 font-bold">
          Bienvenidos a Nuestra Comunidad
        </h2>
        <p className="font-sans">Un lugar de paz y encuentro espiritual.</p>
      </section>

      <div id="servicios" className="py-8">
        <h2 className="text-xl font-bold">Nuestros Servicios</h2>
        <p>Descripción de los servicios ofrecidos...</p>
      </div>

      <footer className="bg-carmelita text-black text-center p-4 mt-8">
        © 2024 Iglesia de Ejemplo. Todos los derechos reservados.
      </footer>
    </div>
  );
}
