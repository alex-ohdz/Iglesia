import React from "react";

const BoxText = () => {
  return (
    <div className="py-7 sm:h-[550px] flex-row items-center">
      <h1 className=" text-3xl font-serif mb-5 text-amber-900 text-center">
        Bienvenidos a Nuestra Comunidad
      </h1>
      <div className="w-full">
        <div className="float-right w-72 h-72 md:h-96 md:w-96">
          <img
            src="images/prueba3.jpg"
            alt="Descripción de la imagen"
            className="w-full h-full object-cover rounded-l-full"
          />
        </div>
        <p className="text-amber-800 font-serif mx-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default BoxText;
