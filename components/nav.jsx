"use client";
import { useState, useEffect } from "react";
import NavPC from "@components/navPC";
import NavMobile from "@components/navMobile";

export default function Nav({t}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth > 800);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      {isMobile ? (
        <NavPC isMobile={isMobile} />
      ) : (
        <NavMobile isMobile={isMobile} />
      )}
    </div>
  );
}
