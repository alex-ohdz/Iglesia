import NavText from "@components/navText";
import Link from "next/link";
import LangChanger from "./langChanger";


const NavPC = ({isMobile}) => {
  return (
    <nav className="flex justify-between items-center py-3 px-5 text-white fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
      <Link href={"/"}>
        <h1 className="text-amber-900 font-playfair text-2xl">
          San Juan Bautista de Remedios
        </h1>
      </Link>
      <NavText isMobile={isMobile} />
      <LangChanger/>
    </nav>
  );
};

export default NavPC;
