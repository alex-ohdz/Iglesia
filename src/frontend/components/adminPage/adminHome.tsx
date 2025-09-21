"use client";
import { useState } from "react";
import RecentActivity from "./recent-activity/recentActivity";
import Workers from "./workers/workers";
import HomeCarousel from "./home-carousel/homeCarousel";
import AdminNavbar from "./adminNavbar";

const sections = [
  { id: "home_carousel", label: "Carrusel" },
  { id: "recent_activity", label: "Noticias" },
  { id: "workers", label: "Trabajadores" },
];

const AdminHome = () => {
  const [select, setSelect] = useState("home_carousel");

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
    <div className="flex min-h-screen flex-col bg-slate-100">
      <AdminNavbar
        sections={sections}
        currentSection={select}
        onSectionChange={setSelect}
      />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10">
        <section className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-sanctuaryBrick">
            Hola, bienvenido a la página de administración
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Utiliza el menú superior para gestionar el carrusel de inicio, las
            noticias destacadas y al equipo de trabajo.
          </p>
        </section>
        <section className="rounded-2xl bg-white p-4 shadow-lg">
          {renderComponent()}
        </section>
      </main>
    </div>
  );
};

export default AdminHome;
