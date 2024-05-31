import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AdminHome = () => {
  return (
    <div className="flex flex-col gap-y-5 justify-center items-center ">
      <h1>Hola bienvenido a la pagina de administracion</h1>
      <p>Carrusel</p>
      <div className="flex justify-center items-center ">
        <button className="bg-stone-300 rounded-full hover:bg-stone-500">
          <AddIcon className="text-white size-14" />
        </button>
        <div className="h-32 w-96 mx-10 bg-white"></div>
      </div>
    </div>
  );
};

export default AdminHome;
