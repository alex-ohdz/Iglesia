"use client";
import { useState, useEffect } from "react";
import NavPC from "@components/navPC";
import NavMobile from "@components/navMobile";
export default function Nav({ initialIsMobile }) {
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800);
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
        <NavMobile isMobile={isMobile} />
      ) : (
        <NavPC isMobile={isMobile} />
      )}
    </div>
  );
}
