import React from 'react';

const teamMembers = [
  { name: "Nombre del Trabajador 1", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/290.jpeg" },
  { name: "Nombre del Trabajador 2", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/450.jpeg" },
  { name: "Nombre del Trabajador 3", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/291.jpeg" },
  { name: "Nombre del Trabajador 4", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/458.jpeg" },
  { name: "Nombre del Trabajador 5", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/280.jpeg" },
  { name: "Nombre del Trabajador 6", role: "Cargo o Rol", imageUrl: "https://rickandmortyapi.com/api/character/avatar/451.jpeg" },
];

const ImageCircle = () => {
  return (
    <div className="bg-amber-100 p-5 anchored-section" id="us">
      <h2 className="text-3xl mb-8 text-center font-serif text-gray-600">Nuestro Equipo</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={member.imageUrl}
              alt={`Imagen de ${member.name}`}
              className="rounded-full w-24 h-24 object-cover border border-gray-300 shadow-md"
            />
            <p className="mt-4 font-semibold text-gray-800">{member.name}</p>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCircle;
