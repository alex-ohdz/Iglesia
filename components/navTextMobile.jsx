import React from "react";
import Link from "next/link";
import LangChanger from "./langChanger";

const NavTextMobile = ({ items }) => {
  return (
    <div className="flex flex-col items-center">
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
      <LangChanger />
    </div>
  );
};

export default NavTextMobile;
