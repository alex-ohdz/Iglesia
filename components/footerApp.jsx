import ImageCircle from "./weAre";
import ContactUs from "./contactUs";
import Link from "next/link";


const FooterApp = () => {
  return (
    <>
      <ImageCircle  />
      <ContactUs  />
      {/* <Map /> */}
      <p className="p-3 text-center font-playfair">
        © 2024 Iglesia de San Bautista de Remedios. Todos los derechos
        reservados.
        <Link href={'/secret'}>
        secret
        </Link>
        {/* Developed by Dmigoya and alex-ohdz */}
      </p>
    </>
  );
};

export default FooterApp;
