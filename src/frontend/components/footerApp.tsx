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
    <footer className="relative overflow-hidden bg-gradient-to-br from-sanctuaryDeep via-slate-900 to-[#04060d] text-sanctuaryLinen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sanctuaryGold/10 blur-3xl" />
      <div className="relative">
        {showContact && (
          <div className="allow-text-selection border-b border-white/10 bg-sanctuaryCream/10 backdrop-blur-sm">
            <ContactUs />
          </div>
        )}
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sanctuaryGold/80">
                Comunidad viva
              </p>
              <h2 className="text-3xl font-display text-white md:text-4xl">
                Iglesia de San Bautista de Remedios
              </h2>
              <p className="allow-text-selection text-sm leading-6 text-slate-300">
                Celebramos la fe con música, servicio y esperanza. Únete a nuestras
                actividades, participa en los ministerios y comparte la experiencia de
                una iglesia cercana y comprometida.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/donations"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-sanctuaryGold hover:bg-sanctuaryGold/10"
                >
                  Realizar una donación
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full bg-sanctuaryGold/20 px-5 py-2 text-sm font-semibold text-sanctuaryGold transition hover:bg-sanctuaryGold/30"
                >
                  Planificar una visita
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-sanctuaryGold/80">
                Explora
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li>
                  <Link className="transition hover:text-sanctuaryGold" href="/">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-sanctuaryGold" href="/nosotros">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-sanctuaryGold" href="/servicios">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-sanctuaryGold" href="/donations">
                    Donaciones
                  </Link>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 backdrop-blur">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-sanctuaryGold/90">
                Próximo servicio
              </h3>
              <p className="mt-4 text-lg font-display text-white">Domingos · 10:30 a.m.</p>
              <p className="allow-text-selection mt-3 text-sm leading-6 text-slate-200">
                Te esperamos en Remedios para compartir juntos un tiempo de adoración,
                reflexión y comunidad.
              </p>
              <Link
                href="/contacto"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-sanctuaryTerracotta px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-sanctuaryBrick"
              >
                Cómo llegar
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <p className="allow-text-selection text-center md:text-left">
              © 2024 Iglesia de San Bautista de{" "}
              <Link className="cursor-default text-sanctuaryGold" href="/secret">
                Remedios.
              </Link>{" "}
              {t("Todos los derechos reservados.")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 uppercase tracking-[0.35em] text-sanctuaryGold/60">
              <span>Fe</span>
              <span>Comunidad</span>
              <span>Servicio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
