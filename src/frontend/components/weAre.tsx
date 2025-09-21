'use client';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const ImageCircle = () => {
  const { t } = useTranslation();
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch('/api/getWorkers');
        const data = await response.json();
        if (data.success) {
          setTeamMembers(data.data);
        } else {
          console.error('Error fetching workers:', data.error);
        }
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div className="anchored-section bg-sanctuary-stone p-5" id="us">
      <h2 className="mb-8 text-center font-display text-3xl text-sanctuary-terracotta">{t('Nuestro Equipo')}</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={`data:image/jpeg;base64,${member.image}`} // Correctly formatting the Base64 string
              alt={`Imagen de ${member.name}`}
              className="h-24 w-24 rounded-full border border-sanctuary-gold/60 object-cover shadow-md"
            />
            <p className="mt-4 font-display text-sanctuary-shadow">{member.name}</p>
            <p className="text-sm text-sanctuary-shadow/80">{member.rol}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCircle;
