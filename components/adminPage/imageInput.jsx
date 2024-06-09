import React from "react";

const ImageInput = ({ onFilesSelected }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    onFilesSelected(files);
  };

  return (
    <div className="">
      <label className="flex flex-row justify-center border-2 place-items-center gap-1 border-black bg-stone-300 hover:bg-stone-500 text-md p-2 cursor-pointer">
        <p>Seleccionar imágenes</p>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
};

export default ImageInput;
