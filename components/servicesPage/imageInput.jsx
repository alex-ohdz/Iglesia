import AddIcon from "@mui/icons-material/Add";

function ImageInput() {
  return (
    <div>
      {" "}
      <button className="bg-stone-300 rounded-full hover:bg-stone-500">
        <AddIcon className="text-white size-14" />
      </button>
    </div>
  );
}

export default ImageInput;
