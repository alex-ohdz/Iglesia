import Link from "next/link";
import { useTranslation } from "react-i18next";

const items = [
  { key: "us", link: "/" },
  { key: "services", link: "/servicios" },
  { key: "contact", link: "/contacto" },
  { key: "donations", link: "/donations" },
];

type NavTextProps = {
  layout?: "horizontal" | "vertical";
  variant?: "solid" | "overlay";
  onNavigate?: () => void;
};

const NavText = ({ layout = "horizontal", variant = "solid", onNavigate }: NavTextProps) => {
  const { t } = useTranslation();

  const containerClasses =
    layout === "horizontal"
      ? "flex flex-row items-center gap-6"
      : "flex flex-col items-start gap-5";

  const linkBaseClasses =
    "font-display text-base sm:text-lg uppercase tracking-[0.15em] transition-colors duration-300";

  const colorClasses =
    variant === "overlay"
      ? "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] hover:text-sanctuaryGold"
      : "text-sanctuaryBrick hover:text-sanctuaryGold";

  const handleClick = () => {
    onNavigate?.();
  };

  return (
    <nav aria-label="Navegación principal">
      <ul className={containerClasses}>
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.link}
              className={`${linkBaseClasses} ${colorClasses}`}
              onClick={handleClick}
            >
              {t(`navigation.${item.key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavText;
