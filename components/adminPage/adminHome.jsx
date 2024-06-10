"use client";
import { useState } from "react";
import UploadImage from "./UploadImage";

const AdminHome = () => {
  const [select, setSelect] = useState("home_carousel");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center ">
      <h1>Hola bienvenido a la página de administración</h1>
      <select
        value={select}
        onChange={handleChange}
        id="table"
        className="text-xl border-2 border-gray-500"
        required
      >
        <option value="home_carousel">Carrusel</option>
        <option value="recent_activity">Noticias</option>
        <option value="workers">Trabajadores</option>
      </select>
      <div className="flex justify-center items-center ">
        <UploadImage section={select} />
      </div>
    </div>
  );
};

export default AdminHome;
