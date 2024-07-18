import Link from "next/link";
import { useTranslation } from "react-i18next";

const items = [
  { key: "us", link: "#us" },
  { key: "services", link: "#services" },
  { key: "contact", link: "#contact" },
  { key: "donations", link: "donations" },
];

const NavText = ({ isMobile }) => {
  const { t } = useTranslation();

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center`}>
      {items.map((item, index) => (
        <div className={`${isMobile ? 'mb-5' : 'px-2'}`} key={index}>
          <Link
            href={item.link}
            className="text-amber-800 hover:text-yellow-500 transition-colors duration-300 text-lg font-playfair tracking-wider"
          >
            {t(`navigation.${item.key}`)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavText;
