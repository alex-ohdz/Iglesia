import ContactUs from "./contactUs";
import Link from "next/link";  

const FooterApp = () => {

  return (
    <div className="anchored-section2" id="contact">
      <ContactUs />
      <p className="flex flex-col sm:flex-row p-3 justify-center text-center font-playfair bg-gray-800 text-white cursor-default">
        <span>
          © 2024 Iglesia de San Bautista de{" "}
          <Link className="cursor-default mr-1" href="/secret">
            Remedios.
          </Link>
        </span>
        <span>Todos los derechos reservados/</span>
        {/* Developed by Dmigoya and alex-ohdz */}
      </p>
    </div>
  );
};

export default FooterApp;
