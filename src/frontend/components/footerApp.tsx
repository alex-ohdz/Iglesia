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

  return (
    <div className="anchored-section2" id="contact">
      <ContactUs />
      <p className="flex flex-col justify-center bg-sanctuary-shadow p-3 text-center font-display text-sanctuary-cream sm:flex-row">
        <span>
          © 2024 Iglesia de San Bautista de{" "}
          <Link className="cursor-default mr-1" href="/secret">
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
