"use client";
import { useState, type ComponentType } from "react";
import RecentActivity from "./recent-activity/recentActivity";
import Workers from "./workers/workers";
import HomeCarousel from "./home-carousel/homeCarousel";
import AdminNavbar from "./adminNavbar";

type AdminZone = {
  id: string;
  title: string;
  summary: string;
  description: string;
  component: ComponentType;
};

const adminZones: AdminZone[] = [
  {
    id: "home_carousel",
    title: "Carrusel principal",
    summary: "Actualiza las imágenes destacadas del inicio.",
    description:
      "Gestiona las imágenes que se muestran en la portada. Puedes subir nuevas fotografías, eliminarlas y asegurarte de que el carrusel muestre siempre contenido actualizado.",
    component: HomeCarousel,
  },
  {
    id: "recent_activity",
    title: "Noticias y novedades",
    summary: "Publica y organiza la actividad reciente.",
    description:
      "Edita las noticias que aparecen en la web. Cada entrada permite destacar actividades recientes, agregar descripciones y mantener informada a la comunidad.",
    component: RecentActivity,
  },
  {
    id: "workers",
    title: "Equipo de trabajo",
    summary: "Gestiona los perfiles del personal.",
    description:
      "Mantén al día la información del equipo. Agrega nuevos perfiles, actualiza biografías y muestra quiénes colaboran en el santuario.",
    component: Workers,
  },
];

const AdminHome = () => {
  const [selectedZoneId, setSelectedZoneId] = useState(adminZones[0]?.id);
  const selectedZone =
    adminZones.find((zone) => zone.id === selectedZoneId) ?? adminZones[0];
  const SelectedZoneComponent = selectedZone.component;

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-sans text-slate-900">
      <AdminNavbar showSections={false} />
      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-10 px-8 py-12">
        <section className="rounded-3xl border border-slate-200 bg-white px-10 py-8 shadow-xl">
          <h2 className="text-3xl font-bold leading-tight text-sanctuaryBrick">
            Centro de administración del santuario
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-600">
            Dividimos las herramientas en zonas claras para que puedas ubicar
            rápidamente lo que necesitas. Usa el panel lateral para elegir qué
            parte del sitio deseas actualizar.
          </p>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-slate-600">
            Cada sección incluye una explicación breve de su propósito y el
            formulario correspondiente para mantener el contenido del sitio
            siempre al día.
          </p>
        </section>
        <section className="grid gap-8 lg:grid-cols-[360px,1fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-sanctuaryTerracotta">
                Zonas de gestión
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Selecciona una categoría para ver sus detalles y herramientas.
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {adminZones.map((zone) => {
                const isActive = zone.id === selectedZone.id;
                return (
                  <li key={zone.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`w-full rounded-3xl border bg-white px-6 py-5 text-left text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta focus:ring-offset-2 ${
                        isActive
                          ? "border-sanctuaryBrick text-sanctuaryBrick shadow-lg"
                          : "border-sanctuaryGold/60 text-slate-600 hover:border-sanctuaryTerracotta/80 hover:text-sanctuaryBrick hover:shadow"
                      }`}
                    >
                      <span className="block text-lg font-bold leading-6">
                        {zone.title}
                      </span>
                      <span className="mt-2 block text-sm font-normal leading-6">
                        {zone.summary}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <header className="border-b border-slate-200 pb-6">
              <h3 className="text-2xl font-bold leading-7 text-sanctuaryBrick">
                {selectedZone.title}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
                {selectedZone.description}
              </p>
            </header>
            <div className="mt-8">
              <SelectedZoneComponent />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminHome;
