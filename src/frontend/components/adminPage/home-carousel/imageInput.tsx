import React, { useRef } from "react";
import { PlusIcon } from "@components/icons";

const ImageInput = ({ onFilesSelected }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event) => {
    onFilesSelected(event.target.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={inputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 rounded-md bg-sanctuary-terracotta px-4 py-2 font-display tracking-[0.12em] text-sanctuary-cream transition hover:bg-sanctuary-terracotta/90 focus:outline-none focus:ring-2 focus:ring-sanctuary-gold focus:ring-offset-2"
      >
        <PlusIcon className="h-5 w-5" /> Seleccionar imágenes
      </button>
    </div>
  );
};

export default ImageInput;
