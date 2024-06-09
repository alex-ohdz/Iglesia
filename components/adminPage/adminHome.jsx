"use client";

import HomeCaruosel from "./homeCaruosel";
import RecentAct from "./recentAct";
import Workers from "./workers";
import { useState } from "react";

const AdminHome = () => {
  const [select, setSelect] = useState("home_carousel");
  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const renderComponent = () => {
    switch (select) {
      case "home_carousel":
        return <HomeCaruosel />;
      case "recent_activity":
        return <RecentAct />;
      case "workers":
        return <Workers />;
    }
  };
  return (
    <div className="flex flex-col gap-y-5 justify-center items-center ">
      <h1>Hola bienvenido a la pagina de administracion</h1>
      <select
        value={select}
        onChange={handleChange}
        id="table"
        className="text-xl"
        required
      >
        <option value="home_carousel">Carrusel</option>
        <option value="recent_activity">Noticias</option>
        <option value="workers">Trabajadores</option>
      </select>
      <div className="flex justify-center items-center ">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminHome;
