"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import PageShell from "@components/pageShell";
import HomeHero from "@components/homeHero";
import Noticias from "@components/noticias/noticias";
import Loading from "@components/loading";
import "../i18next.config";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  if (!i18n.isInitialized) {
    return <Loading />;
  }

  return (
    <PageShell>
      <HomeHero />
      <section className="bg-sanctuaryLinen py-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center md:items-start md:text-left">
          <h2 className="text-3xl font-display text-sanctuaryBrick sm:text-4xl">{t("welcome")}</h2>
          <p
            ref={ref}
            className={`font-body text-base text-sanctuaryDeep transition-all duration-700 ease-out md:text-lg ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {t("sections.about.subtitle")}
          </p>
          <Link
            href="/nosotros"
            className="rounded-full bg-sanctuaryBrick px-6 py-3 font-display text-sm uppercase tracking-widest text-sanctuaryLinen shadow-md transition hover:bg-sanctuaryTerracotta"
          >
            {t("navigation.us")}
          </Link>
        </div>
      </section>
      <Noticias />
    </PageShell>
  );
}
