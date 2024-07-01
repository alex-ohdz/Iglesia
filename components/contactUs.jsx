import Map from "./map";
import SocialMedia from "./socialMedia";

const ContactUs = () => {
  return (
    <>
      <div className="bg-amber-200 text-stone-700">
        <div className="text-center pt-5 pb-3">
          <h1 className="font-roboto text-2xl text-stone-600">Contáctanos</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center place-content-center gap-3 p-3 lg:gap-28 font-roboto">
          <div className="p-10 w-96 h-80" id="contact">
            <h2 className="font-semibold">Horarios:</h2>
            <p>
              <span>Lunes a Viernes :</span> <span>8:00 am - 5:00 pm </span>
            </p>
            <p className="mb-1">
              <span>Sábados :</span> <span>8:00 am - 12:00 pm </span>
            </p>
            <p>
              <span>Domingos :</span> <span>8:00 am - 12:00 pm </span>
            </p>

            <div className="mt-9">
              <h2 className="font-semibold">Info:</h2>
              <p>
                <span>Teléfono:</span> <span>12345678 </span>
              </p>
              <p>
                <span>Correo:</span> <span>sanjuan@gmail.com </span>
              </p>
            </div>
            <SocialMedia />
          </div>

          <div className="w-96 h-32 md:h-56">
            <Map />
          </div>
        </div>
      </div>
      {/* <SocialMedia/> */}
    </>
  );
};

export default ContactUs;
