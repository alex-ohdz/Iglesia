"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavPC from "@components/navPC";
import NavMobile from "@components/navMobile";

export default function Nav() {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isHome = pathname === "/";

  return isDesktop ? <NavPC isHome={isHome} /> : <NavMobile isHome={isHome} />;
}
