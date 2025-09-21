'use client';
import { useState, useEffect } from "react";
import Cards from "./cards";
import { useTranslation } from "react-i18next";

const Noticias = () => {
  const { t } = useTranslation();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/getActivities');
        const data = await response.json();
        if (data.success) {
          setNotices(data.data);
        }
      } catch (error) {
        console.error('Error fetching notices', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="mx-auto px-4 bg-sanctuaryCream pb-10">
      <h1 className="text-center font-display text-3xl py-10 text-sanctuaryBrick">{t(`Actividades Recientes`)}</h1>
      <div className="cardsok">
        {notices.map((n, index) => (
          <Cards key={index} itemKey={index} title={n.title} text={n.body} imageUrl={`data:image/jpeg;base64,${n.image}`} date={n.date}/>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
