import React from 'react';
import AddIcon from '@mui/icons-material/Add';

function ImageInput({ onFilesSelected }) {
  const handleFileChange = (event) => {
    const files = event.target.files;
    onFilesSelected(files);
  };

  return (
    <div className="">
      <label className="flex flex-row justify-center border-2 place-items-center gap-1 border-black bg-sky-500 hover:bg-sky-800 text-md p-2 cursor-pointer text-white">
        <AddIcon fontSize="medium" />
        <p>Seleccionar imágenes</p>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
}

export default ImageInput;
