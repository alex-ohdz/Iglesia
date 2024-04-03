import React from "react";

const ContactUs = () => {
  return (
    <>
      <h1>Contactanos</h1>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea deserunt,
        suscipit beatae velit quo, blanditiis, repellat incidunt odio maiores
        temporibus aliquam eius sunt ex? Repellendus a facilis at dolorem ab.
      </div>
      <div className="bg-gray-100 p-4">
        <h1 className="text-xl font-semibold mb-4">Horarios:</h1>
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Lunes a Viernes :</span> 8:00am - 5:00pm
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Sábados :</span> 8:00am - 12:00pm
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Domingos :</span> 8:00am - 12:00pm
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-blue-500 font-semibold">
            Teléfono: <span className="font-normal">12345678</span>
          </p>
		  <p className="text-blue-500 font-semibold">
            Correo: <span className="font-normal">sanjuan@gmail.com</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
