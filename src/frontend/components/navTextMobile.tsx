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
              className="px-2 font-display text-lg uppercase tracking-[0.18em] text-sanctuary-shadow transition-colors duration-300 hover:text-sanctuary-terracotta"
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
