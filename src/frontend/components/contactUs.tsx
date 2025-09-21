"use client";
import { Trans } from "react-i18next";
import Map from "./map";
import SocialMedia from "./socialMedia";

const ContactUs = () => {
  return (
    <>
      <div className="bg-sanctuary-cream text-sanctuary-shadow">
        <div className="pt-5 pb-3 text-center">
          <h1 className="font-display text-2xl text-sanctuary-terracotta">
            <Trans i18nKey="contact_us">Contáctanos</Trans>
          </h1>
        </div>
        <div className="flex flex-col items-center place-content-center gap-3 p-3 font-body md:flex-row lg:gap-28">
          <div className="p-10 w-[390px] h-80" id="contact">
            <h2 className="font-display text-lg text-sanctuary-terracotta">
              <Trans i18nKey="hours">Horarios</Trans>:
            </h2>
            <p>
              <span><Trans i18nKey="weekdays">Lunes a Viernes</Trans> :</span> <span>8:00 am - 5:00 pm </span>
            </p>
            <p className="mb-1">
              <span><Trans i18nKey="saturday">Sábados</Trans> :</span> <span>8:00 am - 12:00 pm </span>
            </p>
            <p>
              <span><Trans i18nKey="sunday">Domingos</Trans> :</span> <span>8:00 am - 12:00 pm </span>
            </p>

            <div className="mt-9">
              <h2 className="font-display text-lg text-sanctuary-terracotta">
                <Trans i18nKey="info">Info</Trans>:
              </h2>
              <p>
                <span><Trans i18nKey="phone">Teléfono</Trans>:</span> <span>12345678 </span>
              </p>
              <p>
                <span><Trans i18nKey="email">Correo</Trans>:</span> <span>sanjuan@gmail.com </span>
              </p>
            </div>
            <SocialMedia />
          </div>

          <div className="w-96 h-32 md:h-56">
            <Map />
          </div>
        </div>
      </div>
      {/* <SocialMedia/> */}
    </>
  );
};

export default ContactUs;
