import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="grid grid-cols-2 items-center bg-slate-200 w-full">
        <div className="ml-5 mb-5">
        <h1 className="font-serif text-2xl text-amber-900">Contacto :</h1>
        <div className="col-span-1 my-4">
          
        </div>
        <div className=" bg-white p-4 anchored-section grid-col" id="contact">
          <div className="bg-white p-6">
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
          </div>
          <div className="bg-white p-6">
            <p className="text-amber-900 font-semibold">
              Teléfono: <span className="font-normal">12345678</span>
            </p>
            <p className="text-amber-900 font-semibold">
              Correo: <span className="font-normal">sanjuan@gmail.com</span>
            </p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
