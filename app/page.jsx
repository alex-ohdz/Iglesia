"use client";
import Hero from "@components/hero";
import BoxText from "@components/boxText";
import Nav from "@components/nav";
import Services from "@components/services";
import FooterApp from "@components/footerApp";
import Carrousel from "@components/carrousel";
import Noticias from "@components/noticias/noticias";
import { useTranslation } from "react-i18next";
import "../i18n";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
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
        <FooterApp />
      </footer>
    </>
  );
}
