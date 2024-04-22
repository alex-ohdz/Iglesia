import ImageCircle from "./weAre";
import ContactUs from "./contactUs";
import Map from "./map";

const FooterApp = () => {
  return (
    <div className="">
      <ImageCircle />
        <ContactUs />
        <Map />
        <p className="p-3 text-center font-playfair">© 2024 Iglesia de San Bautista de Remedios. Todos los derechos reservados.</p>
    </div>
  );
};

export default FooterApp;
