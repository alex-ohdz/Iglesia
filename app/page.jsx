"use client";
import { Suspense } from "react";
import BoxText from "@components/boxText";
import Nav from "@components/nav";
import Services from "@components/services";
import FooterApp from "@components/footerApp";
import Carrousel from "@components/carrousel";
import Noticias from "@components/noticias/noticias";
import ImageCircle from "@components/weAre";
import { useTranslation } from "react-i18next";
import "../i18next.config";
import ProgressBar from "@components/adminPage/home-carousel/progressBar";

export default function Home() {
  const { t, i18n } = useTranslation();

  if (!i18n.isInitialized) {
    return <ProgressBar/>;
  }

  return (
    <Suspense fallback={<ProgressBar/>}>
      <Nav />
      <Carrousel />
      <aside>
        <BoxText />
        <Noticias />
      </aside>
      <section>
        <Services />
      </section>
      <footer>
      <ImageCircle />
        <FooterApp />
      </footer>
    </Suspense>
  );
}
