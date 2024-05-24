import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavText from "./navText";
import Link from "next/link";
import LangChanger from "./langChanger";

const NavMobile = ({ isMobile }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <nav className="flex fixed z-40 py-3 px-4 justify-between w-full h-14 bg-white border-b-2 border-gray-100">
      <Link href={"/"}>
        <h1 className="text-amber-900 font-playfair text-2xl">
          San Juan Bautista de Remedios
        </h1>
      </Link>
      <div className="flex items-center">
        <LangChanger />
        <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          <MenuIcon
            style={{ fontSize: "30px", background: "white" }}
            className="iconClose"
          />
        </button>

        {isDrawerOpen && (
          <div className="fixed top-0 right-0 w-1/3 max-w-full h-full bg-white z-20 shadow-lg">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 bg-white"
            >
              <CloseIcon
                style={{
                  fontSize: "30px",
                  background: "white",
                }}
                className="iconClose"
              />
            </button>
            <NavText isMobile={isMobile} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavMobile;
