"use client";

import BoxText from "@components/boxText";
import ImageCircle from "@components/weAre";
import Loading from "@components/loading";
import PageShell from "@components/pageShell";
import SectionHero from "@components/sectionHero";
import { useTranslation } from "react-i18next";
import "../../i18next.config";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80";
const ABOUT_SECTION_IMAGE =
  "https://images.unsplash.com/photo-1467307983825-619715426c48?auto=format&fit=crop&w=1200&q=80";

const NosotrosPage = () => {
  const { t, i18n } = useTranslation();

  if (!i18n.isInitialized) {
    return <Loading />;
  }

  return (
    <PageShell>
      <SectionHero
        imageUrl={ABOUT_IMAGE}
        title={t("sections.about.title")}
        description={t("sections.about.subtitle")}
      />
      <BoxText imageUrl={ABOUT_SECTION_IMAGE} />
      <ImageCircle />
    </PageShell>
  );
};

export default NosotrosPage;
