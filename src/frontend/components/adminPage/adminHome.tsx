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
    <div className="flex min-h-screen flex-col bg-slate-100">
      <AdminNavbar showSections={false} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10">
        <section className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-sanctuaryBrick">
            Centro de administración del santuario
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Dividimos las herramientas en zonas claras para que puedas ubicar
            rápidamente lo que necesitas. Usa el panel lateral para elegir qué
            parte del sitio deseas actualizar.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Cada sección incluye una explicación breve de su propósito y el
            formulario correspondiente para mantener el contenido del sitio
            siempre al día.
          </p>
        </section>
        <section className="grid gap-6 lg:grid-cols-[320px,1fr]">
          <aside className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-sanctuaryTerracotta">
                Zonas de gestión
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Selecciona una categoría para ver sus detalles y herramientas.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {adminZones.map((zone) => {
                const isActive = zone.id === selectedZone.id;
                return (
                  <li key={zone.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`w-full rounded-2xl border bg-white p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta focus:ring-offset-2 ${
                        isActive
                          ? "border-sanctuaryBrick shadow-lg"
                          : "border-sanctuaryGold/60 hover:border-sanctuaryTerracotta/80 hover:shadow"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-sanctuaryBrick">
                        {zone.title}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {zone.summary}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <header className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-semibold text-sanctuaryBrick">
                {selectedZone.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {selectedZone.description}
              </p>
            </header>
            <div className="mt-6">
              <SelectedZoneComponent />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminHome;
