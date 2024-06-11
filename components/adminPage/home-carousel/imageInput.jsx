import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const HiddenInput = styled("input")({
  display: "none",
});

const ImageInput = ({ onFilesSelected }) => {
  const handleChange = (event) => {
    onFilesSelected(event.target.files);
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="image-upload">
        <HiddenInput
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<AddIcon />}
          className="bg-blue-600 hover:bg-blue-900 text-white"
        >
          Seleccionar imágenes
        </Button>
      </label>
    </div>
  );
};

export default ImageInput;
