"use client";
import ContactUs from "./contactUs";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Loading from "./loading";

const FooterApp = () => {
  const { t, i18n } = useTranslation();

  if (!i18n.isInitialized) {
    return <Loading />;
  }

  const secretToken = process.env.NEXT_PUBLIC_SECRET_TOKEN;

  return (
    <div className="anchored-section2" id="contact">
      <ContactUs />
      <p className="flex flex-col sm:flex-row p-3 justify-center text-center font-playfair bg-gray-800 text-white cursor-default">
        <span>
          © 2024 Iglesia de San Bautista de{" "}
          <Link className="cursor-default mr-1" href={`/secret?token=${secretToken}`}>
            Remedios.
          </Link>
        </span>
        <span>{t("Todos los derechos reservados.")}</span>
        {/* Developed by Dmigoya and alex-ohdz */}
      </p>
    </div>
  );
};

export default FooterApp;
