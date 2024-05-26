import Map from "./map";

const ContactUs = () => {
  return (
    <>
      <div className="bg-amber-200">
        <div className="text-center pt-5 pb-3">
          <h1 className="font-serif text-3xl text-amber-700">Contacto :</h1>
        </div>
        <div className=" flex flex-col md:flex-row items-center place-content-center gap-3 p-3">
          <div
            className="p-10 anchored-section border-1 border-gray-300 shadow-md w-96 h-80 bg-white"
            id="contact"
          >
            <h2 className="text-xl font-serif text-amber-900">Horarios:</h2>
            <p className="text-amber-900 mb-1">
              <span className="font-merriweather text-xl">
                Lunes a Viernes :
              </span>{" "}
              8:00 am - 5:00 pm
            </p>
            <p className="text-amber-900 mb-1">
              <span className=" font-merriweather text-xl">Sábados :</span> 8:00
              am - 12:00 pm
            </p>
            <p className="text-amber-900">
              <span className="font-merriweather font-semi text-xl">
                Domingos :
              </span>{" "}
              8:00 am - 12:00 pm
            </p>

            <div className="bg-white mt-10">
              <p className="text-amber-900">
                <span className="font-merriweather text-xl">Teléfono:</span>{" "}
                12345678
              </p>
              <p className="text-amber-900 ">
                <span className="font-merriweather text-xl">Correo:</span>{" "}
                sanjuan@gmail.com
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
