"use client";
import { useState, useEffect } from "react";

const ImageCircle = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("/api/getWorkers");
        const data = await response.json();
        if (data.success) {
          setTeamMembers(data.data);
        } else {
          console.error("Error fetching workers:", data.error);
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div className="bg-amber-100 p-5 anchored-section" id="us">
      <h2 className="text-3xl mb-8 text-center font-serif text-gray-600">
        Nuestro Equipo
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={`data:image/jpeg;base64,${member.image}`} // Correctly formatting the Base64 string
              alt={`Imagen de ${member.name}`}
              className="rounded-full w-24 h-24 object-cover border border-gray-300 shadow-md"
            />
            <p className="mt-4 font-semibold text-gray-800">{member.name}</p>
            <p className="text-sm text-gray-600">{member.rol}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCircle;
