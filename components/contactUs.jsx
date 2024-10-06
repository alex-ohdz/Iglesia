"use client";
import { useTranslations } from "next-intl";
import Map from "./map";
import SocialMedia from "./socialMedia";

const ContactUs = () => {
  const t = useTranslations("contact"); // Se asume que las traducciones están bajo la clave "contact"

  return (
    <div className="bg-amber-200 text-stone-700 px-5">
      <div className="text-center py-8">
        <h1 className="text-3xl font-serif text-center text-amber-900">
          {t("title")}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center place-content-center gap-3 p-3 lg:gap-28 font-roboto">
        <div className=" w-[390px] h-64" id="contact">
          <h2 className="font-semibold">{t("hoursTitle")}:</h2>
          <p>
            <span>{t("weekday")}:</span> <span>8:00 am - 5:00 pm </span>
          </p>
          <p className="mb-1">
            <span>{t("saturday")}:</span> <span>8:00 am - 12:00 pm </span>
          </p>
          <p>
            <span>{t("sunday")}:</span> <span>8:00 am - 12:00 pm </span>
          </p>

          <div className="mt-9">
            <h2 className="font-semibold">{t("infoTitle")}:</h2>
            <p>
              <span>{t("phone")}:</span> <span>12345678 </span>
            </p>
            <p>
              <span>{t("email")}:</span> <span>sanjuan@gmail.com </span>
            </p>
          </div>
          <SocialMedia />
        </div>

        <div className="w-96 h-32 md:h-56">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
