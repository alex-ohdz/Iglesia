"use client";
import ContactUs from "./contactUs";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Loading from "./loading";

type FooterAppProps = {
  showContact?: boolean;
};

const FooterApp = ({ showContact = true }: FooterAppProps) => {
  const { t, i18n } = useTranslation();

  if (!i18n.isInitialized) {
    return <Loading />;
  }

  return (
    <footer className="bg-sanctuaryDeep text-sanctuaryLinen">
      {showContact && <ContactUs />}
      <p className="flex flex-col justify-center gap-1 px-4 py-3 text-center font-display sm:flex-row">
        <span>
          © 2024 Iglesia de San Bautista de{" "}
          <Link className="cursor-default text-sanctuaryGold" href="/secret">
            Remedios.
          </Link>
        </span>
        <span>{t("Todos los derechos reservados.")}</span>
      </p>
    </footer>
  );
};

export default FooterApp;
