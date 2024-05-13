"use client";
import AdjustIcon from "@mui/icons-material/Adjust";
import CircleIcon from "@mui/icons-material/Circle";
import { useState, useEffect } from "react";

const Carrousel = () => {
  const [foto, setFoto] = useState([]);

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await fetch(
          "https://rickandmortyapi.com/api/character/1,2"
        );
        const data = await res.json();
        setFoto(data);
      } catch (err) {
        console.error("Hubo un error en la carga del carrusel", err);
      }
    }
    fetchImage();
  }, []);

  return (
    <div className="flex flex-col lg:h-screen max-h-max items-center bg-slate-300 justify-center">
      <div className="flex justify-center container max-w-screen-md bg-red-700 shadow-md  md:aspect-auto mt-28">
        {foto.map((foto, index) => (
          <img className="aspect-auto" key={index} src={foto.image} alt="" />
        ))}
      </div>
      <div className="flex flex-row bg-red-300 my-4 ">
        <AdjustIcon />
        <CircleIcon />
      </div>
    </div>
  );
};

export default Carrousel;
