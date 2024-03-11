'use client'
import { useEffect, useState } from 'react';

const useActiveSection = (sections, defaultOffset = 0) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const offset = window.innerHeight / 2 || defaultOffset;
      
      const handleScroll = () => {
        let currentSection = "";
        let minDistance = Infinity;

        sections.forEach((item) => {
          const section = document.getElementById(item.link);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            const distance = Math.abs(scrollPosition - sectionTop + offset);
            if (
              distance < minDistance &&
              scrollPosition + offset >= sectionTop &&
              scrollPosition < sectionTop + sectionHeight
            ) {
              minDistance = distance;
              currentSection = item.link;
            }
          }
        });

        setActiveSection(currentSection);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [sections]); // Se elimina 'defaultOffset' de las dependencias para evitar re-renderizados innecesarios

  return activeSection;
};

export default useActiveSection;
