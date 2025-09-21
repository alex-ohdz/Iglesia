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
        <h1 className="mb-6 mt-12 text-center font-display text-2xl text-sanctuary-shadow">
          Hola, bienvenido a la página de administración
        </h1>
        <select
          value={select}
          onChange={handleChange}
          id="table"
          className="mb-5 rounded-md border-2 border-sanctuary-gold bg-white p-2 text-lg font-body transition duration-150 ease-in-out focus:border-sanctuary-terracotta focus:outline-none focus:ring-2 focus:ring-sanctuary-terracotta/60"
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
