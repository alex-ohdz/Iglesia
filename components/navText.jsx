import Link from "next/link";




const items = [
  { text: "Sobre Nosotros", link: "#sobre" },
  { text: "Servicios", link: "/services"},
  { text: "Contacto", link: "#contacto" },
  { text: "Donar", link: "#donar" },
];

const NavText = () => {

  return (
    <div className="flex">
      {items.map((item, index) => {
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
