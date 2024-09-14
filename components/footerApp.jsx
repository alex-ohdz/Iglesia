import { useTranslations } from "next-intl";
import ContactUs from "./contactUs";
import Link from "next/link";

const FooterApp = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <div className="anchored-section2" id="contact">
      <ContactUs />
      <p className="flex flex-col sm:flex-row p-3 justify-center text-center font-playfair bg-gray-800 text-white cursor-default">
        <span>
       {"©"}{" "}{currentYear}{" "}{t("copyright")} {" "}
          <Link className="cursor-default mr-1" href="/secret">
            Remedios.
          </Link>
        </span>
        <span>{t("allRightsReserved")}</span>
      </p>
    </div>
  );
};

export default FooterApp;
