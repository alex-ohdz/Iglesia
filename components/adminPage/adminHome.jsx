"use client";
import { useState } from "react";
import RecentActivity from "./recentActivity";
import Workers from "./workers";
import HomeCarousel from "./homeCarousel";

const AdminHome = () => {
  const [select, setSelect] = useState("home_carousel");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const renderComponent = () => {
    switch (select) {
      case "home_carousel":
        return <HomeCarousel/>;
      case "recent_activity":
        return <RecentActivity />;
      case "workers":
        return <Workers />;
      default:
        return <HomeCarousel />;
    }
  };

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center ">
      <h1>Hola, bienvenido a la página de administración</h1>
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
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminHome;
