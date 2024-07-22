import BoxText from "@components/boxText";
import Nav from "@components/nav";
import Services from "@components/services";
import FooterApp from "@components/footerApp";
import Carrousel from "@components/carrousel";
import Noticias from "@components/noticias/noticias";
import ImageCircle from "@components/weAre";

export default function Home() {
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
        <ImageCircle />
        <FooterApp />
      </footer>
    </>
  );
}
