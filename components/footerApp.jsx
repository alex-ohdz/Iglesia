import ImageCircle from "./weAre";
import ContactUs from "./contactUs";
import Link from "next/link";

const FooterApp = () => {
  return (
    <>
      <ImageCircle />
      <ContactUs />
      <p className="flex flex-col p-3 text-center font-playfair bg-gray-800 text-white cursor-default">
        <span>
          © 2024 Iglesia de San Bautista de{" "}
          <Link className="cursor-default" href={"/secret"}>
            Remedios.
          </Link>
        </span>
        <span>Todos los derechos reservados.</span>
        {/* Developed by Dmigoya and alex-ohdz */}
      </p>
    </>
  );
};

export default FooterApp;
