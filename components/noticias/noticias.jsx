import Cards from "./cards";

const notices = [
  {
    title: "Nombre del Trabajador 1",
    text: "Cargo o Rol",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/290.jpeg",
    date:"20 de febrero"
  },
  {
    title: "Nombre del Trabajador 2",
    text: "orem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, repellendus quas quasi dolore, cumque voluptas magni ab iusto perspiciatis alias nostrum optio? Cupiditate consectetur perspiciatis beatae ducimus voluptatum, iusto sint?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus nostrum nemo explicabo dolores ipsa voluptate facere, obcaecati, incidunt voluptatibus sunt, aut amet eligendi dolore illo ex porro possimus adipisci!",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/450.jpeg",
    date:"20 de febrero"
  },
  {
    title: "Nombre del Trabajador 3",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto harum cupiditate pariatur magni magnam illum consequuntur sapiente quis saepe, dolores repudiandae et ea repellat sequi, quo voluptatem qui rem veniam?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis voluptatum labore doloribus quasi inventore neque earum dignissimos porro, incidunt suscipit repellendus dicta quas esse consectetur, assumenda accusantium nam, eum exercitationem?",
    imageUrl: "https://rickandmortyapi.com/api/character/avatar/291.jpeg",
    date:"20 de febrero"
  }
];

const Noticias = () => {
  return (
    <div className="mx-auto px-4 bg-slate-100 pb-10" id="services">
      <h1 className="text-center font-serif text-3xl py-10 text-amber-800">Actividades Recientes</h1>
      <div className="cardsok">
        {notices.map((n, index) => (
          <Cards key={index} title={n.title} text={n.text} imageUrl={n.imageUrl} date={n.date}/>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
