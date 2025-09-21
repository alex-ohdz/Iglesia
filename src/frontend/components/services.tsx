"use client";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const serviceKeys = [
  { id: 1, key: "baptism" },
  { id: 2, key: "wedding" },
  { id: 3, key: "community" },
];

function Services() {
  const { t } = useTranslation();
  const [value, setValue] = useState(serviceKeys[0].id);

  const services = useMemo(
    () =>
      serviceKeys.map(({ id, key }) => ({
        id,
        key,
        title: t(`services.items.${key}.title`),
        description: t(`services.items.${key}.description`),
      })),
    [t]
  );

  const selected = services.find((service) => service.id === value) ?? services[0];

  return (
    <section className="bg-sanctuaryLinen py-12">
      <div className="mx-auto max-w-4xl px-6 font-body text-sanctuaryDeep">
        <h1 className="text-center font-display text-3xl text-sanctuaryBrick">{t("services.heading")}</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setValue(service.id)}
              className={`rounded-full px-4 py-3 text-sm font-display uppercase tracking-widest transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                service.id === selected.id
                  ? "bg-sanctuaryBrick text-sanctuaryLinen shadow-lg"
                  : "bg-sanctuaryTerracotta/80 text-sanctuaryLinen hover:bg-sanctuaryTerracotta"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>
        <div className="mt-10 rounded-xl bg-white/80 p-6 text-center text-base shadow-md md:text-lg">
          {selected.description}
        </div>
      </div>
    </section>
  );
}

export default Services;
