import Cards from "./cards";

const notices = [
  {
    title: "Nombre del Trabajador 1",
    text: "Cargo o Rol",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/290.jpeg",
  },
  {
    title: "Nombre del Trabajador 2",
    text: "Cargo o Rol",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/450.jpeg",
  },
  {
    title: "Nombre del Trabajador 3",
    text: "Cargo o Rol",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/291.jpeg",
  },
  {
    title: "Nombre del Trabajador 1",
    text: "Cargo o Rol",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/290.jpeg",
  },
  {
    title: "Nombre del Trabajador 2",
    text: "Cargo o Rol",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/450.jpeg",
  },
  {
    title: "Nombre del Trabajador 3",
    text: "Cargo o Rol",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/291.jpeg",
  },
];

const Noticias = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-7 place-items-center">
        {notices.map((n, index) => (
          <Cards />
        ))}
      </div>
    </div>
  );
};

export default Noticias;
