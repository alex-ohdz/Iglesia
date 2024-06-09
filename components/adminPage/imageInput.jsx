import React from 'react';
import AddIcon from '@mui/icons-material/Add';

function ImageInput({ onFilesSelected }) {
  const handleFileChange = (event) => {
    const files = event.target.files;
    onFilesSelected(files);
  };

  return (
    <div className="">
      <label className="flex flex-row justify-center border-2 place-items-center gap-1 border-black bg-sky-300 hover:bg-sky-500 text-md p-2 cursor-pointer">
        <AddIcon className="text-white" fontSize="large" />
        <p>Seleccionar imágenes</p>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
}

export default ImageInput;
