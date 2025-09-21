"use client";

import ContactUs from "@components/contactUs";
import Loading from "@components/loading";
import PageShell from "@components/pageShell";
import SectionHero from "@components/sectionHero";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { useTranslation } from "react-i18next";
import "../../i18next.config";

const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1529753256307-1c3c9cbe26ff?auto=format&fit=crop&w=1400&q=80";

const ContactoPage = () => {
  const { t, i18n } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  if (!i18n.isInitialized) {
    return <Loading />;
  }

  return (
    <PageShell showContactInFooter={false}>
      <SectionHero
        imageUrl={CONTACT_IMAGE}
        title={t("sections.contact.title")}
        description={t("sections.contact.subtitle")}
      />
      <section className="bg-sanctuaryLinen py-12">
        <div className="mx-auto max-w-3xl px-6 text-center text-sanctuaryDeep md:text-left">
          <p
            ref={ref}
            className={`font-body text-base transition-all duration-700 ease-out md:text-lg ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {t("sections.contact.intro")}
          </p>
        </div>
      </section>
      <ContactUs />
    </PageShell>
  );
};

export default ContactoPage;
