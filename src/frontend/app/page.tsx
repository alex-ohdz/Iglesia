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
  const [introRef, isIntroVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  if (!i18n.isInitialized) {
    return <Loading />;
  }

  return (
    <PageShell>
      <HomeHero />
      <section className="bg-sanctuaryLinen py-12">
        <div
          ref={introRef}
          className={`mx-auto flex max-w-4xl transform-gpu flex-col items-center gap-6 px-6 text-center transition-all duration-700 ease-out md:items-start md:text-left ${
            isIntroVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-6 opacity-0 md:-translate-x-12"
          }`}
        >
          <h2
            className={`text-3xl font-display text-sanctuaryBrick transition-all duration-700 ease-out sm:text-4xl ${
              isIntroVisible ? "translate-x-0" : "translate-x-4 md:translate-x-8"
            }`}
          >
            {t("welcome")}
          </h2>
          <p
            className={`font-body text-base text-sanctuaryDeep transition-all duration-700 ease-out md:text-lg ${
              isIntroVisible
                ? "translate-x-0 opacity-100 delay-150"
                : "translate-x-6 opacity-0 delay-0 md:translate-x-10"
            }`}
          >
            {t("sections.about.subtitle")}
          </p>
          <Link
            href="/nosotros"
            className={`rounded-full bg-sanctuaryBrick px-6 py-3 font-display text-sm uppercase tracking-widest text-sanctuaryLinen shadow-md transition-all duration-700 ease-out hover:bg-sanctuaryTerracotta ${
              isIntroVisible
                ? "translate-x-0 opacity-100 delay-200"
                : "translate-x-8 opacity-0 delay-0 md:translate-x-12"
            }`}
          >
            {t("navigation.us")}
          </Link>
        </div>
      </section>
      <Noticias />
    </PageShell>
  );
}
