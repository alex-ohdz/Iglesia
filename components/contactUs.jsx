import Map from "./map";

const ContactUs = () => {
  return (
    <>
      <div className="bg-amber-200 text-stone-700 font-merriweather text-xl">
        <div className="text-center pt-5 pb-3">
          <h1 className="font-serif text-3xl text-stone-600">Contáctanos</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center place-content-center gap-3 p-3 lg:gap-28">
          <div
            className="p-10 anchored-section border-1 border-gray-300 shadow-md w-96 h-80 bg-white italic"
            id="contact"
          >
            <h2 className="not-italic">Horarios:</h2>
            <p>
              <span>
                Lunes a Viernes :
              </span>{" "}
              <span className="not-italic">8:00
              am - 5:00 pm </span>
            </p>
            <p className="mb-1">
              <span>Sábados :</span> <span className="not-italic">8:00
              am - 12:00 pm </span>
            </p>
            <p>
              <span>
                Domingos :
              </span>{" "}
              <span className="not-italic">8:00
              am - 12:00 pm </span>
            </p>

            <div className="mt-9">
              <h2 className="not-italic">Info:</h2>
              <p>
                <span>Teléfono:</span>{" "}
                <span className="not-italic">12345678 </span>
              </p>
              <p>
                <span>Correo:</span>{" "}
                <span className="not-italic">sanjuan@gmail.com </span>
              </p>
            </div>
          </div>
          <div className="w-96 h-44 md:h-80">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
