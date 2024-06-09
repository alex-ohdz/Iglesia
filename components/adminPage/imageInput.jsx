import AddIcon from "@mui/icons-material/Add";

function ImageInput() {
  return (
    <div className="">
      <button className="flex flex-row justify-center border-2 place-items-center gap-1 border-black bg-stone-300 hover:bg-stone-500 text-md p-1">
        <AddIcon className="text-white" fontSize="large" />
        <p>Seleccionar imagenes</p>
      </button>
    </div>
  );
}

export default ImageInput;
