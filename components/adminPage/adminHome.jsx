"use client";
import { useState } from "react";
import RecentActivity from "./recent-activity/recentActivity";
import Workers from "./workers/workers";
import HomeCarousel from "./home-carousel/homeCarousel";

const AdminHome = () => {
  const [select, setSelect] = useState("home_carousel");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const renderComponent = () => {
    switch (select) {
      case "home_carousel":
        return <HomeCarousel />;
      case "recent_activity":
        return <RecentActivity />;
      case "workers":
        return <Workers />;
      default:
        return <HomeCarousel />;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Hola, bienvenido a la página de administración</h1>
      <select
        value={select}
        onChange={handleChange}
        id="table"
        className="text-lg border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out p-2 mb-5"
        required
      >
        
        <option value="home_carousel">Carrusel</option>
        <option value="recent_activity">Noticias</option>
        <option value="workers">Trabajadores</option>
      </select>
      </div>
        {renderComponent()}
        </>
  );
};

export default AdminHome;
