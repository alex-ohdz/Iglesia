import React from "react";

const ContactUs = () => {
  return (
    <>
      <h1>Contactanos</h1>
      <div className="bg-white p-4">
        <h1 className="text-xl font-semibold mb-4">Horarios:</h1>
        <div className="bg-white p-6 mb-4">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Lunes a Viernes :</span> 8:00 am - 5:00 pm
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Sábados :</span> 8:00 am - 12:00 pm
          </p>
          <p className="text-gray-700">
            <span className="font-merriweather text-lg">Domingos :</span> 8:00 am - 12:00 pm
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
