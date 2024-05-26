import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="bg-white p-4 anchored-section" id="contact">
        <h1 className="text-lg font-semibold px-6">Horarios:</h1>
        <div className="bg-white p-6">
          <p className="text-gray-700 mb-1">
            <span className="font-merriweather text-xl">Lunes a Viernes :</span> 8:00 am - 5:00 pm
          </p>
          <p className="text-gray-700 mb-1">
            <span className=" font-merriweather text-xl">Sábados :</span> 8:00 am - 12:00 pm
          </p>
          <p className="text-gray-700">
            <span className="font-merriweather font-semi text-xl">Domingos :</span> 8:00 am - 12:00 pm
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-gray-700 font-semibold">
            Teléfono: <span className="font-normal">12345678</span>
          </p>
		  <p className="text-gray-700 font-semibold">
            Correo: <span className="font-normal">sanjuan@gmail.com</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
