import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AdminHome = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Hola bienvenido a la pagina de administracion</h1>
      <p>Carrusel</p>
      <div className="">
        <button className="relative top-16 right-28 bg-stone-500 rounded-full">
          <AddIcon className="text-white size-14" />
        </button>
        <div className="h-96 w-96 bg-slate-300"></div>
      </div>
    </div>
  );
};

export default AdminHome;
