import Link from "next/link";
// import LangChanger from "./langChanger";

const items = [
  { text: "Nosotros", link: "#us" },
  { text: "Servicios", link: "/services" },
  { text: "Contacto", link: "#contact" },
  { text: "Donar", link: "#donar" },
];

const NavText = ({ isMobile }) => {



  return (

    <div className={`flex ${isMobile ? 'flex-row' : 'flex-col'} items-center`}>
      {items.map((item, index) => {
        return (
          <div className={`${isMobile ? 'px-2' : 'mb-5'}`} key={index}>
            <Link
              href={item.link}
              className="text-amber-800 hover:text-yellow-500 transition-colors duration-300 text-lg font-playfair tracking-wider"
            >
              {item.text}
            </Link>
          </div>
        );
      })}
      {/* <LangChanger /> */}
    </div>
  );
};

export default NavText;
