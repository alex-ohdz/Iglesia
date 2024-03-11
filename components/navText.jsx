
import Link from "next/link";
import ServicesLinks from "./servicesLink";
// import useActiveSection from "../hooks/useActiveSection";


const items = [
  { text: "Sobre Nosotros", link: "#sobre" },
  { text: "Contacto", link: "#contacto" },
  { text: "Donar", link: "#donar" },
];

const NavText = () => {

  // const activeSection = useActiveSection([...buttonText, ...items]);
  // const isServiceActive = buttonText.some(item => item.link === activeSection);

  const navItems = [
    ...items.slice(0, 1), 
    { isComponent: true }, 
    ...items.slice(1), 
  ];

  return (
    <div className="flex">
      {navItems.map((item, index) => {
        if (item.isComponent) {
          return <ServicesLinks key="servicesLinks" />;
        }
        return (
          <div key={index}>
            <Link
              href={item.link}
              className="text-amber-800 hover:text-yellow-500 transition-colors duration-300 text-lg font-playfair tracking-wider px-2"
            >
              {item.text}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavText;
