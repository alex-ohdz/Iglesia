'use client';
import { useState, useEffect } from "react";
import Cards from "./cards";
import { useTranslations } from "next-intl";

const Noticias = () => {
  const [notices, setNotices] = useState([]);
  const t = useTranslations("noticias");

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
    <div className="mx-auto px-4 bg-yellow-200 pb-10">
      <h1 className="text-center font-serif text-3xl py-10 text-amber-800">{t('title')}</h1>
      <div className="cardsok">
        {notices.map((n, index) => (
          <Cards key={index} itemKey={index} title={n.title} text={n.body} imageUrl={`data:image/jpeg;base64,${n.image}`} date={n.date}/>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
