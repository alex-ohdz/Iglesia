import React from 'react';

const teamMembers = [
  { name: "Nombre del Trabajador 1", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/290.jpeg" },
  { name: "Nombre del Trabajador 2", role: "Cargo o Rol", imageUrl:  "https://rickandmortyapi.com/api/character/avatar/450.jpeg" },
  { name: "Nombre del Trabajador 1", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/291.jpeg" },
  { name: "Nombre del Trabajador 2", role: "Cargo o Rol", imageUrl:  "https://rickandmortyapi.com/api/character/avatar/458.jpeg" },
  { name: "Nombre del Trabajador 1", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/280.jpeg" },
  { name: "Nombre del Trabajador 2", role: "Cargo o Rol", imageUrl:  "https://rickandmortyapi.com/api/character/avatar/451.jpeg" },
];

const ImageCircle = () => {
  return (
    <div className="bg-amber-100 p-5 anchored-section" id="us">
      <h2 className="text-2xl mb-4 text-center font-serif text-gray-900">Nuestro Equipo</h2>
      <div className="flex xl:justify-center overflow-x-auto space-x-4 py-2">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex-none text-center py-1">
            <img src={member.imageUrl} alt={member.name} className="mx-auto rounded-full w-24 h-24 object-cover border border-black" />
            <p className="mt-2 text-stone-700">{member.name}</p>
            <p className="text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCircle;
