import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ImagePreview = ({ selectedFiles, onDelete, onMove }) => (
  <div className="bg-green-100 mt-4 mx-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {selectedFiles.map((file, index) => (
      <div key={index} className="relative h-52 ">
        <div className="h-40 bg-blue-400">
          <img
            src={URL.createObjectURL(file)}
            alt={`preview-${index}`}
            className="w-full h-full object-cover rounded"
          />
          <div className="flex justify-between mt-2">
            <IconButton
              aria-label="move-left"
              onClick={() => onMove(index, -1)}
              disabled={index === 0}
            >
              <ArrowBackIcon style={{ color: index === 0 ? "gray" : "black" }} />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => onDelete(index)}
            >
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
            <IconButton
              aria-label="move-right"
              onClick={() => onMove(index, 1)}
              disabled={index === selectedFiles.length - 1}
            >
              <ArrowForwardIcon style={{ color: index === selectedFiles.length - 1 ? "gray" : "black" }} />
            </IconButton>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ImagePreview;
