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
  }
];

const Noticias = () => {
  return (
    <div className="mx-auto px-4 bg-slate-100 pb-10">
      <h1 className="text-center font-serif text-3xl py-10 text-amber-800">Actividades Recientes</h1>
      <div className="cards">
        {notices.map((n, index) => (
          <Cards key={index} title={n.title} text={n.text} imageUrl={n.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default Noticias;
