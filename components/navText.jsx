import Link from "next/link";
import { useTranslations } from "next-intl";

const items = [
  { key: "us", link: "#us" },
  { key: "services", link: "#services" },
  { key: "contact", link: "#contact" },
  { key: "donations", link: "donations" },
];

const NavText = ({ isMobile }) => {
  const t = useTranslations("nav"); // Traducciones para este componente

  return (
    <div className={`flex ${isMobile ? 'flex-row' : 'flex-col'} items-center`}>
      {items.map((item, index) => (
        <div className={`${isMobile ? 'px-2' : 'mb-5'}`} key={index}>
          <Link
            href={item.link}
            className="text-amber-800 hover:text-yellow-500 transition-colors duration-300 text-lg font-playfair tracking-wider"
          >
            {t(item.key)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavText;
